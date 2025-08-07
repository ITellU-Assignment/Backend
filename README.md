# iTellU Backend (NestJS + Prisma + SQLite)

## Overview
This service provides a REST API for managing teachers, students, and lesson invites.  
Business rules enforced:
- Only one future accepted invite per student.
- Auto-rejects other invites at the same time when one is accepted.
- Prevents duplicate invites (same teacher, student, and time).

## Tech Stack
- NestJS (TypeScript)
- Prisma ORM with SQLite
- `log.txt` for audit logging

## Setup & Run

1. **Install dependencies**  
   ```bash
   cd backend
   npm install
