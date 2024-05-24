SAPDrive

This project is a software solution designed to optimize the schedule for tire changes at a service station. It provides a user-friendly interface for scheduling appointments, utilizes an optimized algorithm for efficient appointment allocation, and integrates with the Twilio API for SMS notifications.

Features

Login Page: Users can log in with valid credentials to access the system.
Responsive UI: Implemented using Angular to ensure a user-friendly experience across devices.
Backend Processing: Utilizes Flask coupled with Python for data processing and business logic handling.
Twilio Integration: Sends SMS notifications to customers about their appointment schedules.
Optimized Algorithm: Efficiently allocates appointments to minimize idle time for stations and bays.
Upload Feature: Allows users to upload relevant documents or images for reference during appointments.

Algorithm Overview
The system utilizes a variation of the First Come First Serve (FCFS) scheduling algorithm to manage appointments at different stations based on the type of vehicle. The algorithm ensures efficient allocation of appointments to minimize idle time for stations and bays.

Directory Structure
SAPDrive/
│
├── frontend/
│   ├── angular_app/
│   │   └── (Angular project files)
│   └── (Frontend related files)
│
├── backend/
│   ├── app.py                (Flask application)
│   ├── algorithms.py         (Optimization algorithms)
│   ├── data_processing.py    (Data processing utilities)
│   └── twilio_integration.py (Twilio API integration)
│
├── documentation/
│   └── README.md             (Project documentation)
│
└── tests/
    └── (Test files)
Usage

Clone the Repository:
git clone https://github.com/your_username/tire_change_optimization.git

Install Dependencies:

Navigate to the frontend/angular_app directory and install Angular dependencies.

cd frontend/angular_app
npm install
Navigate to the backend directory and install Flask dependencies.
bash
Copy code
cd backend
pip install -r requirements.txt
Run the Application:

Start the Angular frontend.

ng serve
Start the Flask backend.
bash
Copy code
python app.py
Access the Application:

Open your web browser and go to http://localhost:4200 to access the application.
Contributing

Contributions are welcome! Feel free to submit pull requests, report issues, or suggest improvements.

License

This project is licensed under the MIT License.
