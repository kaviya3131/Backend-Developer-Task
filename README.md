This is a RESTful API built with Node.js, Express.js, and PostgreSQL for managing jobs and job applications.


## Features
Manage Jobs – Create, view, and fetch job details.  
Handle Applications – Submit and retrieve job applications.  
Data Validation – Prevent invalid job applications.  
PostgreSQL Integration – Secure relational database management.  
Error Handling– Clear error messages for failed requests.  

## Setup Instructions

### Install Dependencies

npm install

### Configure Environment Variables
Modify **`.env`** file in the root directory:

```env
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_NAME=job_board
DB_PORT=5432
PORT=5000
```

###  Set Up PostgreSQL Database
#### Create Database

```sh
psql -U your_postgres_user
```
Then run:
```sql
CREATE DATABASE job_board;
```

#### Create Tables (Optional as the code already creates one if table doesn't exist)
```sql
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    job_id INT REFERENCES jobs(id) ON DELETE CASCADE,
    applicant_name VARCHAR(255) NOT NULL,
    applicant_email VARCHAR(255) NOT NULL,
    cover_letter TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Start the Server
```sh
npm start
```
The server should start on `http://localhost:5000/`

### API can be tesed using postman(documented the same in the word document)

### Optional task - Created a frontend using html and js

## Troubleshooting

### "Cannot POST /applications"
 Make sure `routes/applications.js` has `router.post("/")`.  
 Use JSON format and set `Content-Type: application/json`.  
 Ensure the job ID exists before submitting an application.  
 Restart the backend: `npm start`.  

