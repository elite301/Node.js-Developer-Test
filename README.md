# User Management API

## Setup

1. Install dependencies: `npm install`
2. Setup MySQL database: `mysql -u root -p < setup.sql`
3. Start server: `node app.js`

## API Endpoints

- GET /users: Fetch all users
- GET /users/:id: Fetch single user by ID
- POST /users: Create new user
- PUT /users/:id: Update user by ID
- DELETE /users/:id: Delete user by ID

## Database sql

CREATE TABLE users (
    id INT AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    confirmed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

-- Seed table
INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');