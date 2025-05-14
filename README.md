# SuperAiPadel - Padel Reservation Platform

A SaaS web platform for padel reservation that consolidates multiple facility applications into a single interface.
s

## Project Overview

SuperAiPadel provides a unified platform for users to reserve padel courts across various facilities in Tunisia. The platform features multiple dashboards tailored to different user roles:

- **User Dashboard**: Reserve terrains, view history, purchase tokens/tickets, rent equipment
- **Admin Dashboard**: Manage facilities, view reservations, access statistics, handle equipment rental/sales
- **Super Admin Dashboard**: Monitor facility owners, access detailed statistics, configure pricing

## Technical Stack

### Frontend

- Next.js (React framework)
- Tailwind CSS for styling
- JWT for authentication

### Backend

- Spring Boot
- Spring Security for authentication and authorization
- PostgreSQL for database

## Project Structure

```
├── frontend/        # Next.js application
└── backend/         # Spring Boot application
```

## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

### Backend Setup

1. Navigate to the backend directory: `cd backend`
2. Build the project: `./mvnw clean install`
3. Run the application: `./mvnw spring-boot:run`

## License

All rights reserved.
