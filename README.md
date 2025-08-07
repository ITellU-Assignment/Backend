````markdown
# iTellU Backend (NestJS + Prisma + SQLite)

## Overview
This service provides a REST API for managing teachers, students, and lesson invites.

**Business Rules Enforced:**
- Only one future accepted invite per student  
- Auto-reject other invites at the same time when one is accepted  
- Prevent duplicate invites (same teacher, student, and scheduled time)

## Tech Stack
- NestJS (TypeScript)  
- Prisma ORM with SQLite  
- `log.txt` for audit logging  

## Setup & Run

1. **Install dependencies**  
   ```bash
   cd backend
   npm install
````

2. **Configure database**
   In `prisma/schema.prisma`, ensure:

   ```env
   DATABASE_URL="file:./dev.db"
   ```

3. **Apply migrations & generate client**

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **(Optional) Seed sample data**

   ```bash
   npx prisma db seed
   ```

5. **Start development server**

   ```bash
   npm run start:dev
   ```

   The API listens on **[http://localhost:5000](http://localhost:5000)** by default.

## API Endpoints

* **POST** `/teachers`
  Create a new teacher
* **GET** `/teachers`
  List all teachers
* **POST** `/students`
  Create a new student
* **GET** `/students`
  List all students
* **POST** `/invites`
  Send a lesson invite
* **PATCH** `/invites/:id`
  Accept or reject an invite
* **GET** `/invites`
  List all invites (optional `?status=pending|accepted|rejected`)

## Assumptions

* No backend authentication (handled by frontend)
* Times are sent and compared as UTC ISO strings
* Logging uses `fs.appendFileSync` into `log.txt`
* Uses SQLite for development; switch to MySQL/PostgreSQL by updating `DATABASE_URL` and rerunning migrations

```
```
