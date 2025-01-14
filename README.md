# EventEase

Welcome to **EventEase**, your one-stop destination for discovering, managing, and attending exciting events! This repository contains the codebase for the EventEase application, built with Next.js (App Router), Tailwind CSS, MongoDB, and Socket.IO to deliver a real-time event management experience.

---

## 🚀 **Features**

- Event creation, updating, and deletion
- User registration and authentication
- Attendee registration with max capacity checks
- Real-time notifications for new attendees and event updates
- Personalized content based on the user
- Responsive and modern UI using Tailwind CSS and Shadcn

---

## 🛠️ **Tech Stack**

- **Frontend**: Next.js (App Router), Tailwind CSS, Shadcn
- **Backend**: Next.js, MongoDB
- **Real-time**: Socket.IO
- **Authentication**: Custom JWT-based authentication

---

## 📁 **Folder Structure**

```
.
├── app
│   ├── page.js            # Landing Page
│   ├── events
│   │   ├── page.js        # Events Page
│   │   └── [id]
│   │
├── components
│   └── Notifications.js   # Real-time notifications component
├── pages
│   └── api
│       └── events
│           └── [id].js    # Event API Endpoint
├── public
├── lib
│   └── dbConnect.js              # MongoDB connection utility
├── hooks
│   └── useSocket.js       # Custom Socket.IO hook
└── next.config.js         # Next.js Configuration
```

---

## 🧑‍💻 **Setup Instructions**

### 1️⃣ **Clone the Repository**

```bash
git clone https://github.com/salsadsid/EventEase.git
cd EventEase
```

### 2️⃣ **Install Dependencies**

```bash
npm install
```

### 3️⃣ **Environment Variables**

Create a `.env` file in the root directory and add the following:

```env
NEXTAUTH_SECRET=your-secret
MONGODB_URI=your-mongodb-uri
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

### 4️⃣ **Run the Development Server**

```bash
npm run dev
```

Visit the app at `http://localhost:3000`

---

## 🔧 **API Endpoints**

### **Event Endpoints**

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| GET    | /api/events              | Get all events       |
| POST   | /api/events              | Create a new event   |
| GET    | /api/events/:id          | Get a specific event |
| PATCH  | /api/events/:id          | Update an event      |
| DELETE | /api/events/:id          | Delete an event      |
| POST   | /api/events/:id/register | Register an attendee |

---

## ⚡ **Real-time Notifications Setup**

To enable real-time notifications, ensure you have Socket.IO configured both on the backend and frontend.

- **Backend:** The Socket.IO server is initialized in `server.js`.
- **Frontend:** The `useSocket` custom hook handles real-time communication.

---

## 🛡️ **License**

This project is licensed under the MIT License.

---

## 🤝 **Contributing**

Contributions are welcome! Please fork the repository and create a pull request.

---

## 📬 **Contact**

If you have any questions, feel free to reach out:

- **Email**: salman.dnj@gmail.com
- **GitHub**: [salsadsid](https://github.com/salsadsid)
