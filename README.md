# iTellU Backend (NestJS + Prisma + SQLite)

## Overview
This service provides a REST API for managing teachers, students, and lesson invites.

**Business Rules Enforced:**
- Only one future accepted invite per student.
- Auto-reject other invites at the same time when one is accepted.
- Prevent duplicate invites (same teacher, student, and scheduled time).

## Tech Stack
- NestJS (TypeScript)
- Prisma ORM with SQLite
- `log.txt` for audit logging

## Setup & Run

1. **Install dependencies**  
   ```bash
   cd backend
   npm install
Configure database
In prisma/schema.prisma, the DB is SQLite with:

env
Copy
Edit
DATABASE_URL="file:./dev.db"
Apply migrations & generate client

bash
Copy
Edit
npx prisma migrate dev --name init
npx prisma generate
(Optional) Seed sample data

bash
Copy
Edit
npx prisma db seed
Start development server

bash
Copy
Edit
npm run start:dev
The API listens on http://localhost:5000 by default.

API Endpoints
POST /teachers – Create a new teacher

GET /teachers – List all teachers

POST /students – Create a new student

GET /students – List all students

POST /invites – Send a lesson invite

PATCH /invites/:id – Accept or reject an invite

GET /invites – List all invites (optional ?status=pending|accepted|rejected)

Assumptions
No backend authentication (handled by frontend).

Times are sent and compared as UTC ISO strings.

Logging uses simple fs.appendFileSync into log.txt.

SQLite is used for development; you can switch to MySQL/PostgreSQL by updating DATABASE_URL and re-running migrations
