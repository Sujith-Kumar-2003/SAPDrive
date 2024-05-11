from flask import Flask, render_template
import csv
from datetime import datetime, timedelta
from flask_cors import CORS, cross_origin
import os
from twilio.rest import Client

app = Flask(__name__)
CORS(app)
CORS(app, origins=['http://127.0.0.1:4200/','http://localhost:4200','http://192.168.122.136:4200'])

vehicle = {
    'compact': [30, 150],  # Time to service in mins and cost
    'medium': [30, 150],
    'full-size': [30, 150],
    'class 1 truck': [60, 250],
    'class 2 truck': [120, 700]
}

class Station:
    def __init__(self, vehicle=None):
        self.appointments = []
        self.revenue = 0
        self.vehicle = None  # Vehicle type that the station will service (if none will service all)
        if vehicle is not None:
            self.vehicle = vehicle

    def isAppointmentClash(self, interval):
        start1 = interval[0].timestamp()
        end1 = interval[1].timestamp()
        for appointment in self.appointments:
            start2 = appointment[0].timestamp()
            end2 = appointment[1].timestamp()
            if not (end1 < start2 or end2 < start1):
                return True
        return False

class Appointment:
    def __init__(self, request_time, appointment_time, type):
        self.request_time = request_time
        self.appointment_time = appointment_time
        self.type = type

class Stations:
    def __init__(self):
        self.stations = [Station(), Station(), Station(), Station(), Station(), Station('compact'), Station('medium'),
                         Station('full-size'), Station('class 1 truck'), Station('class 2 truck')]
        self.accepted_requests = []
        self.declined_requests = []

    def processRequest(self, appointment):
        isInHouse = appointment.request_time == appointment.appointment_time
        requested_appointment_time = [appointment.appointment_time, appointment.appointment_time +
                                      timedelta(minutes=vehicle[appointment.type][0]), appointment.type]
        if isInHouse:
            for station in self.stations:  # Check for assigned station
                if station.vehicle == appointment.type and not station.isAppointmentClash(requested_appointment_time):
                    station.appointments.append(requested_appointment_time)
                    station.revenue += vehicle[appointment.type][1]
                    self.accepted_requests.append(appointment)
                    return
        # Check in one of the general stations
        for station in self.stations:
            if station.vehicle is None and not station.isAppointmentClash(requested_appointment_time):
                station.appointments.append(requested_appointment_time)
                station.revenue += vehicle[appointment.type][1]
                self.accepted_requests.append(appointment)
                return True
        # No possibility so return false
        self.declined_requests.append(appointment)
        return False


def process():
    stations = Stations()
    appointments = []

    # Process csv file
    with open('datafile.csv', mode='r') as file:
        csvFile = csv.reader(file)
        for lines in csvFile:
            appointments.append(Appointment(datetime.strptime(lines[0], '%Y-%m-%d %H:%M'),
                                           datetime.strptime(lines[1], '%Y-%m-%d %H:%M'), lines[2]))

    # Order appointments based on request time
    appointments = sorted(appointments, key=lambda p: (p.request_time))

    # Collect metrics such as all the accepted requests and all the declined requests
    for appointment in appointments:
        stations.processRequest(appointment)

    return stations


@app.route('/send_sms')
def sms():
    client = Client('AC6d82c5d3f2d63eb1c6cfb4d26e126ac9', 'ee66ad530d258b722f784a24ec585fe5')

    stations = process()
    revenue = 0
    for appointment in stations.accepted_requests:
        revenue += vehicle[appointment.type][1]

    missed_revenue = 0
    for appointment in stations.declined_requests:
        missed_revenue += vehicle[appointment.type][1]

    print("Total Revenue " + str(revenue))
    print("Total Missed revenue " + str(missed_revenue))
    print("Accepted requests " + str(len(stations.accepted_requests)))
    print("Rejected requests " + str(len(stations.declined_requests)))
    message = client.messages.create(
        body=f"Total Revenue: {str(revenue)}, Total Missed revenue: {str(missed_revenue)}, Accepted requests: {str(len(stations.accepted_requests))}, Rejected requests: {str(len(stations.declined_requests))}",
        from_='+14312442439',
        to='+15145788948'
    )

    
    return "Success"

@app.route('/allocationData')
def index():
    
    stations = process()
    i = 0
    station_data = []

    for i, stat in enumerate(stations.stations):
        for app in stat.appointments:
            formatted_data = f"{app[0]} - {app[1]} - {app[2]} - {i}"
            station_data.append(formatted_data)

    
    return station_data

if __name__ == '__main__':
    app.run(debug=True)
