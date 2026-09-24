# RecallDev: Spaced Repetition for Interview Revision

Freshers study Java, Spring Boot, React, and SQL for months and forget half of it by interview day.
RecallDev shows each interview question again at the right time, so it stays in memory.

**Live demo:** [(https://frontend-git-main-venu-c00b.vercel.app/)]
**Backend API:** [(https://recalldev-backend.onrender.com)]
(The backend is on a free plan and sleeps when idle. The first load can take up to a minute.)

## Screenshots
(Add 2-3 screenshots: Dashboard, Review screen, All Cards)

## Features
- Register and login (passwords stored as BCrypt hashes)
- Add interview questions with answers and a topic tag
- Daily review queue: only the cards that are due today
- Rate each answer (Again / Hard / Good / Easy); the next review date is calculated automatically
- Each user sees only their own cards

## How the review scheduling works
I implemented the SM-2 spaced repetition algorithm. A forgotten card returns tomorrow.
A remembered card returns after 1 day, then 6 days, then the gap is multiplied by the card's
ease factor. Easy answers make gaps grow faster and hard answers make them shorter.

## Tech stack
Java 17, Spring Boot, Spring Data JPA (Hibernate), MySQL, React (Vite), Bootstrap, Maven, Git/GitHub
Deployed with Docker on Render, Vercel (frontend), and Aiven (MySQL)

## Architecture
React (Vercel) -> Spring Boot REST API (Render) -> MySQL (Aiven)
Backend layers: Controller -> Service -> Repository -> Model


## Run locally
1. Create a MySQL database named `recalldev`
2. Backend: `cd backend`, set your MySQL password in `application.properties`, run `./mvnw spring-boot:run`
3. Frontend: `cd frontend`, run `npm install` then `npm run dev`

## Known limitations and next steps
- Login is simple (the browser sends the user id). Next step: JWT authentication.
- Planned: daily email reminders, weak-topic analytics.