import { Component } from '@angular/core';
import { Allocation, AllocationServiceService } from '../allocation-service.service';

@Component({
  selector: 'app-allocation-page',
  templateUrl: './allocation-page.component.html',
  styleUrls: ['./allocation-page.component.css']
})
export class AllocationPageComponent {
  SelectedDate : string = ''
  allocations: string[] = []
  constructor(private allocationService: AllocationServiceService) {
    const SelectedDate = sessionStorage.getItem('SelectedDate');
    if (SelectedDate !== null) {
      this.SelectedDate = JSON.parse(SelectedDate);
    } else {
      console.log('No customer data found in sessionStorage.');
    }

    this.getAllocationData();
   }

  startTime = 7 * 60;
  endTime = 19 * 60;
  timeSlotInterval = 1;

  timeSlots: string[] = [];
  availabilityMatrix: number[][] = [];
  typeMatrix:string[][] = [];
  bookingTimeRanges: { startTime: number, endTime: number, bay : number, type:string }[] = [];

  convertAllocationToTimeRanges(allocation: Allocation[]) {
    for (const station in allocation) {
      if (allocation.hasOwnProperty(station)) {

      }
    }
  }

  parseDate = (dateString: string): Date => {
    return new Date(dateString);
  };

  getAllocationData() {
    this.allocationService.getAllocationData().subscribe(
      (allocate: string[]) => {
        this.allocations = allocate;
        for (const value of this.allocations) {
          const [startString, endString, type, station] = value.split(" - ");
          const start = new Date(startString);
          const end = new Date(endString);

          const startTime = start.getHours() * 60 + start.getMinutes();
          const endTime = end.getHours() * 60 + end.getMinutes();
          const targetDate = new Date(this.SelectedDate);

          const result = {
            startTime: startTime,
            endTime: endTime,
            bay: Number(station),
            type: type
          };
          if (start.toDateString() === targetDate.toDateString()) {
            this.bookingTimeRanges.push(result);
          }

        }
        this.generateTimeSlots();
          this.initializeAvailabilityMatrix();
      },
      (error) => {
        console.log('Error occurred while retrieving flight list:', error);
      }
    );
  }
  generateTimeSlots() {
    for (let i = this.startTime; i <= this.endTime; i += this.timeSlotInterval) {
      const hours = Math.floor(i / 60);
      const minutes = i % 60;
      const timeSlot = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      this.timeSlots.push(timeSlot);
    }
  }

  initializeAvailabilityMatrix() {
    this.availabilityMatrix = Array.from({ length: this.timeSlots.length }, () => Array(10).fill(0));
    this.typeMatrix = Array.from({ length: this.timeSlots.length }, () => Array(10).fill(''));
    for (const timeRange of this.bookingTimeRanges) {
      const { startTime, endTime, bay ,type} = timeRange;
      for (let i = 0; i < this.timeSlots.length; i++) {
        const slotTime = this.timeSlots[i].split(':');
        const slotMinutes = parseInt(slotTime[0]) * 60 + parseInt(slotTime[1]);
        if (slotMinutes >= startTime && slotMinutes <= endTime) {
          this.availabilityMatrix[i][bay] = 1;
          this.typeMatrix[i][bay] = type;
        }
      }
    }
  }

  updateBayStatus(row: number, col: number) {
    const cellElement = document.getElementById(`cell-${row}-${col}`);

    if (cellElement) {
      if (this.availabilityMatrix[row][col] === 0) {
        cellElement.classList.add('available');
        cellElement.classList.remove('booked');
      } else {
        cellElement.classList.add('booked');
        cellElement.classList.remove('available');
      }
    }
  }

  onCellClick(row: number, col: number) {
    if (this.availabilityMatrix[row][col] === 0) {
      for (let j = 0; j < 10; j++) {
        this.availabilityMatrix[row][j] = 0;
      }
      this.availabilityMatrix[row][col] = 1;
      this.updateBayStatus(row, col);
    } else {
      alert('This time slot is already booked. Please choose another bay.');
    }
  }
}
