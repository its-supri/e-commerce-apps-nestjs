

# 🛒 E-commerce API

This is a **simple e-commerce API** built using:

- **NestJS** (Backend Framework)
- **PostgreSQL** (Database)
- **TypeORM** (ORM)
- **Apache Kafka** (Messaging for event-driven communication)

It supports **three user roles**:
- **Admin**
- **Seller** (default role)
- **Buyer**

API documentation is available through **Swagger**.

---

## 📦 Stack

| Technology | Description |
|:-----------|:------------|
| NestJS | Backend framework |
| PostgreSQL | Relational database |
| TypeORM | ORM for database management |
| Apache Kafka | Event streaming platform |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/L200160149/e-commerce-apps-nestjs.git
cd e-commerce-apps-nestjs
```

### 2. Copy `.env` configuration
```bash
cp .env.example .env
```
Then, **adjust your `.env`** file with the correct database, Kafka, and application configurations.

---

## 🛠️ Running the App

```bash
# Install dependencies
npm install

# Run the app
npm run start:dev
```

The application will start on:  
> `http://localhost:<PORT>`

---

## 📑 API Documentation

Once the app is running, you can access the **Swagger API docs** here:

> [http://localhost:<PORT>/api](http://localhost:<PORT>/api)

The Swagger docs include:
- All available endpoints
- Request and response schemas
- Role-based access (Admin, Seller, Buyer)

---

## 👤 Roles

| Role | Description |
|:-----|:------------|
| Admin | Can manage users, products, orders, etc. |
| Seller | Default role. Can create products and manage inventory. |
| Buyer | Can browse products and place orders. |

---

## 📚 Useful Commands

| Command | Description |
|:--------|:------------|
| `npm run start:dev` | Start the app in development mode |
| `npm run build` | Build the app for production |
| `npm run start:prod` | Start the app in production mode |

---

# 📣 Notes

- Make sure **PostgreSQL** and **Apache Kafka** services are running before starting the app.
- The default user role is **Seller** when a new user is registered.
- Kafka is used for **publishing** and **subscribing** to important domain events (like order creation, payment success, etc.).

---

# 🧡 Happy Building!
