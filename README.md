# E-Store (Django + React)

A full-stack E-commerce application featuring a **Django Rest Framework** backend and a **React (Vite)** frontend. It supports user authentication, product browsing, categorization, cart management, and order placement.

## 🚀 Features

*   **Product Catalog:** Browse products with images, prices, and descriptions.
*   **Search & Filter:** Search products by name/description and filter by category.
*   **User Authentication:**
    *   JWT-based Login & Registration.
    *   Protected Routes (Checkout, Order History).
*   **Shopping Cart:** Session-based cart management (add, remove, update quantity).
*   **Checkout & Orders:**
    *   Place orders with shipping details.
    *   View "My Orders" history.
*   **Rate Limiting:** Protects API from spam/abuse.
*   **Responsive Design:** Fully responsive UI built with Tailwind CSS.

---

## 🛠️ Tech Stack

### **Backend (Django)**
*   **Django 5+ & DRF:** Robust API development.
*   **SimpleJWT:** Secure Token Authentication.
*   **PostgreSQL / SQLite:** Database support (Production/Dev).
*   **Rate Limiting:** Built-in throttling to prevent abuse.

### **Frontend (React)**
*   **React + Vite:** Fast, modern UI development.
*   **Tailwind CSS:** Utility-first styling.
*   **Axios:** HTTP Client with Interceptors (Auto-token refresh).
*   **Context API:** Global State Management (Auth & Cart).

---

## 📦 Installation & Setup

### **1. Backend Setup**
Navigate to the `backend` folder:
```bash
cd backend
```

Create a virtual environment and activate it:
```bash
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```
*(Note: If `requirements.txt` is missing, install manually: `django djangorestframework djangorestframework-simplejwt django-cors-headers pillow python-dotenv`)*

Run Migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

Start the Server:
```bash
python manage.py runserver
```
*Backend runs at: `http://127.0.0.1:8000/`*

### **2. Frontend Setup**
Open a new terminal and navigate to the `frontend` folder:
```bash
cd frontend
```

Install Node modules:
```bash
npm install
```

Start the Development Server:
```bash
npm run dev
```
*Frontend runs at: `http://localhost:5173/`*

---

## 🔑 Environment Variables (.env)

**Backend (`backend/.env`):**
```ini
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
# DATABASE_URL=postgres://... (Optional for Prod)
```

**Frontend (`frontend/.env`):**
```ini
VITE_API_URL=http://127.0.0.1:8000/api/
```

---

## 🛡️ API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/products/` | List all products |
| **GET** | `/api/products/?search=shirt` | Search products |
| **GET** | `/api/products/?category=slug` | Filter by category |
| **POST** | `/api/accounts/register/` | Register new user |
| **POST** | `/api/token/` | Login (Get Access/Refresh Token) |
| **POST** | `/api/orders/create/` | Place a new order (Auth Required) |
| **GET** | `/api/orders/my-orders/` | View User's Order History |

---
