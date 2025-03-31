# Worker API

A RESTful API for managing worker data using Express.js and PostgreSQL with Sequelize ORM.

## Table of Contents

- [Description](#description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Database Configuration](#database-configuration)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Usage Examples](#usage-examples)

## Description

This API provides endpoints to manage worker information, including creating, reading, updating, and deleting worker records. It uses Express.js as the web framework, Sequelize as the ORM, and PostgreSQL as the database.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- CORS

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd worker-api
```

2. Install dependencies
```bash
npm install
```

3. Install required packages if not already in package.json:
```bash
npm install express sequelize pg pg-hstore cors
```

4. Configure your PostgreSQL connection in `postgres/postgres.js`

5. Start the server
```bash
node index.js
```

The server will start running on http://localhost:5000

## Database Configuration

The API connects to a PostgreSQL database with the following configuration:

```javascript
const sequelize = new Sequelize("sequelizedb", "postgres", "yourpassword", {
  host: "localhost",
  dialect: "postgres",
}); 
Check the Sequelize docs
```

Make sure to have a PostgreSQL server running with a database named `sequelizedb`. You may need to adjust the credentials based on your local setup.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/workers/` | Get all workers |
| POST | `/api/workers/add` | Add a new worker |
| PUT | `/api/workers/emp/:empId` | Update worker by employee ID |
| DELETE | `/api/workers/emp/:empId` | Delete worker by employee ID |

### Request Body Format for POST and PUT

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "designation": "Software Engineer",
  "empId": "EMP001"
}
```

## Models

### User Model

| Field | Type | Constraints |
|-------|------|-------------|
| name | STRING | Not null |
| email | STRING | Not null, Lowercase, Unique |
| designation | STRING | Not null |
| empId | STRING | Not null, Unique |

## Usage Examples

### Get All Workers

```bash
curl -X GET http://localhost:5000/api/workers/
```

### Add New Worker

```bash
curl -X POST http://localhost:5000/api/workers/add \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "designation": "Project Manager",
    "empId": "EMP002"
  }'
```

### Update Worker

```bash
curl -X PUT http://localhost:5000/api/workers/emp/EMP002 \
  -H "Content-Type: application/json" \
  -d '{
    "designation": "Senior Project Manager"
  }'
```

### Delete Worker

```bash
curl -X DELETE http://localhost:5000/api/workers/emp/EMP002
```

## Error Handling

The API returns appropriate HTTP status codes:

- 200: Successful operation
- 400: Bad request or user already exists
- 404: User not found
- 500: Server error