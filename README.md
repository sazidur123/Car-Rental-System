# Car Rental System

A web platform for booking, managing, and tracking car rentals with real-time availability.

## Features

- User registration and authentication
- Browse available cars with images and details
- Real-time car availability and booking
- Manage bookings and rental history
- Admin dashboard for managing cars and reservations

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB

## Live Demo

[Car Rental System Live](https://carrentalsystema11.netlify.app/)

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/car-rental-system.git
   cd car-rental-system
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add your MongoDB URI and any other required environment variables.

   Example:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the development server:**
   ```sh
   npm start
   ```

5. **Frontend:**
   - If the frontend is in a separate folder (e.g., `/client`), repeat the install/start steps in that directory.

## Challenges

- Managing booking and payment conflicts
- Ensuring real-time updates for car availability

## Future Improvements

- Add a mobile app for users
- Implement a loyalty program for frequent renters

---

**Feel free to contribute or open issues for suggestions
