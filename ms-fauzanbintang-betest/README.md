# Express.js ms-fauzanbintang-betest Project

## Prerequisites

Before running this project, ensure that you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Redis](https://redis.io/download)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/fauzanbintang/fauzanbintang-betest.git
   cd fauzanbintang-betest/ms-fauzanbintang-betest/
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   In the root directory, create a `.env` file with the following content:

   ```bash
   PORT=3000                     # The port on which your app will run
   MONGODB_URI=mongodb://localhost:27017/dbname  # MongoDB connection string
   REDIS_HOST=localhost           # Redis server hostname or IP
   REDIS_PORT=6379                # Redis server port
   REDIS_PASS=your_redis_password # Optional, Redis server password if required
   JWT_SECRET=your_jwt_secret     # Secret key for signing JWT tokens
   ```

4. **Run the server:**

   Start the server using the following command:

   ```bash
   npm start
   ```

   The server will run at `http://localhost:3000` (or the port you specified in `.env`).

## API Endpoints

Here are some basic API endpoints available in this project:

- `POST /users` - Create a new user
- `GET /users/:id` - Get a user by ID
- `GET /users` - Get a list of users
- `PUT /users/:id` - Update a user by ID
- `DELETE /users/:id` - Delete a user by ID
- `POST /login` - Login and receive a JWT token

## Environment Variables

- **`PORT`**: Port number on which the server will run.
- **`MONGODB_URI`**: MongoDB connection string to connect to the database.
- **`REDIS_HOST`**: Hostname or IP address of the Redis server.
- **`REDIS_PORT`**: Port on which the Redis server is running.
- **`REDIS_PASS`**: Optional Redis password for authentication (if required).
- **`JWT_SECRET`**: Secret key for signing JWT tokens.
