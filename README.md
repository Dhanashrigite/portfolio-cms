# Portfolio CMS

A full-stack personal portfolio website with a custom Content Management System (CMS).

## 🚀 Project Overview

This project is a full-stack portfolio website developed using React, Django REST Framework, and PostgreSQL.

It includes a public portfolio website and a custom CMS dashboard where portfolio content can be managed easily.

## 🏗️ Project Architecture

```text
Public Portfolio (React)
        ↓
Django REST API
        ↓
PostgreSQL Database

CMS Dashboard (React)
        ↓
Django REST API
        ↓
PostgreSQL Database
```

## 🛠️ Technologies Used

### Frontend

* React
* Vite
* JavaScript
* Axios
* React Router

### Backend

* Python
* Django
* Django REST Framework
* JWT Authentication
* PostgreSQL
* Pillow
* Django CORS Headers

## ✨ Features

* Admin/CMS Login
* JWT Authentication
* About Section Management
* Skills Management
* Projects Management
* Experience Management
* Blog Management
* Testimonials Management
* Services Management
* Media/Image Upload
* Public Contact Form
* Contact Messages Management
* PostgreSQL Database Integration

## 📁 Project Structure

```text
portfolio-cms/
│
├── backend/
│   ├── config/
│   ├── core/
│   └── manage.py
│
├── frontend/
│   └── cms/
│
├── portfolio/
│   └── src/
│
└── README.md
```

## ▶️ Run Backend

```bash
cd backend
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000/
```

## ▶️ Run CMS

```bash
cd frontend/cms
npm install
npm run dev
```

## ▶️ Run Portfolio

```bash
cd portfolio
npm install
npm run dev
```

## 🔐 Security

Sensitive information such as database passwords, secret keys, and environment variables should not be uploaded to GitHub.

## 👩‍💻 Author

**Dhanashri Gite**

Computer Science Engineering Student

GitHub:
https://github.com/Dhanashrigite
