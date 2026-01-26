Here is the raw Markdown text. You can copy this directly and paste it into your `README.md` file on GitHub.

```markdown
# 🧘 Chill & Thrive - Backend Documentation

## 1. Project Overview
**Chill & Thrive** is a comprehensive wellness center management system designed to streamline booking appointments for services like Cryotherapy, Steam Baths, and Massages. The system features a secure REST API, real-time slot management, and integrated payments via Razorpay.

### **Tech Stack**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB Atlas (User Data) & Sanity.io (Content Management)
* **Authentication:** JWT (Access & Refresh Tokens)
* **Payments:** Razorpay Integration
* **Deployment:** Render (Backend) & Netlify (Frontend)

---

## 2. Installation & Setup

### **Prerequisites**
Ensure you have the following installed:
* Node.js (v18+)
* MongoDB Compass (Optional, for local DB viewing)
* Git

### **Environment Variables**
Create a `.env` file in the root directory and add the following keys:

```env
# Server Configuration
PORT=3500
NODE_ENV=development

# Database Connection
DATABASE_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ChillAndThrive?retryWrites=true&w=majority

# Authentication Secrets
ACCESS_TOKEN_SECRET=your_super_long_random_string_for_access
REFRESH_TOKEN_SECRET=your_super_long_random_string_for_refresh

# Sanity CMS Configuration
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_WRITE_TOKEN=your_sanity_api_token

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=your_razorpay_secret

```

### **Run Locally**

```bash
# Install dependencies
npm install

# Run in development mode (with Nodemon)
npm run dev

# Run in production mode
npm start

```

---

## 3. API Endpoint Reference

This section outlines the available API routes for the backend.

### **Payment (`/payment`)**

*Handles the financial transactions using Razorpay.*

| Method | Endpoint | Protected? | Description |
| --- | --- | --- | --- |
| `POST` | `/payment/order` | ❌ No | **Initiates a Transaction.** <br>

<br>Frontend sends a `serviceName`. Backend fetches the price from Sanity and asks Razorpay to create an order. Returns an `order_id`. |

**Payload for `/payment/order`:**

```json
{
  "serviceName": "General Wellness"
}

```

### **Bookings (`/bookings`)**

*Manages slot availability and confirming reservations.*

| Method | Endpoint | Protected? | Description |
| --- | --- | --- | --- |
| `POST` | `/bookings/availability` | ❌ No | **Check Slots.** <br>

<br>Checks Sanity for open slots and MongoDB for booked slots to return what is available for a specific date. |
| `POST` | `/bookings` | ✅ Yes (JWT) | **Confirm Booking.** <br>

<br>Verifies the Razorpay payment signature and saves the booking to the database. **Crucial:** Must include payment proof. |
| `GET` | `/bookings` | ✅ Yes (JWT) | **My Bookings.** <br>

<br>Returns a list of all past and upcoming bookings for the logged-in user. |
| `GET` | `/bookings/all` | 🔒 Admin Only | **All Bookings.** <br>

<br>Returns a master list of every booking in the system (for the Admin Dashboard). |

**Payload for `/bookings` (Confirm Booking):**

```json
{
  "service": "General Wellness",
  "date": "2026-02-15",
  "timeSlot": "10:00 AM",
  "resources": ["General Wellness"],
  "razorpay_order_id": "order_Hj8...",
  "razorpay_payment_id": "pay_Kb9...",
  "razorpay_signature": "a3f..."
}

```

### **Authentication (`/auth` & `/register`)**

*Handles user signup and login.*

| Method | Endpoint | Protected? | Description |
| --- | --- | --- | --- |
| `POST` | `/register` | ❌ No | **Sign Up.** <br>

<br>Creates a new user account. Required fields: `email`, `pwd`, `firstname`, `lastname`. |
| `POST` | `/auth` | ❌ No | **Login.** <br>

<br>Authenticates the user and returns an `accessToken` (JWT). |

### **User Management (`/users`)**

*Profile management and administrative user controls.*

| Method | Endpoint | Protected? | Description |
| --- | --- | --- | --- |
| `GET` | `/users/myProfile` | ✅ Yes (JWT) | **Get Profile.** <br>

<br>Returns the details (name, email, role) of the currently logged-in user. |
| `GET` | `/users` | 🔒 Admin Only | **List Users.** <br>

<br>Returns a list of all registered users. |
| `DELETE` | `/users` | 🔒 Admin Only | **Delete User.** <br>

<br>Removes a user from the database. |

---

## 4. Security & Middleware Architecture

This section details the security protocols used to protect the API.

### **Authentication (`verifyJWT`)**

*Ensures that a user is logged in before accessing protected routes.*

* **Mechanism:** JSON Web Token (JWT)
* **Header Format:** `Authorization: Bearer <your_access_token>`
* **Logic:** Checks for a valid signature. If valid, attaches User Information (`email`, `id`, `roles`) to the request object.

### **Role-Based Access Control (`verifyRoles`)**

*Restricts access to specific endpoints based on user permissions.*

* **Usage:** Used as middleware after `verifyJWT`.
* **Logic:** Compares the user's roles against the allowed list for that route.

### **System Logging (`LogEvents`)**

*Tracks system activity and captures errors.*

* **Request Logger:** Logs every incoming API request to `ErrorLogs/reqLog.txt`.
* **Safety Net Logger:** Catches unexpected server crashes and logs the stack trace to `ErrorLogs/errLogSafetyNet.txt`.

---

## 5. Database Schema Reference (MongoDB)

This section documents the **Operational Data** stored in MongoDB (Users and Bookings).
