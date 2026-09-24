# RecallDev: Spaced Repetition for Interview Revision

Freshers study Java, Spring Boot, React, and SQL for months and forget half of it by interview day.
RecallDev shows each interview question again at the right time, so it stays in memory.

**Live demo:** [(https://frontend-git-main-venu-c00b.vercel.app/)]
**Backend API:** [(https://recalldev-backend.onrender.com)]
(The backend is on a free plan and sleeps when idle. The first load can take up to a minute.)

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


## Screenshots
<img width="1365" height="641" alt="Screenshot 2026-09-24 232230" src="https://github.com/user-attachments/assets/6a3739e9-98f2-46fb-a223-8aa53b07038e" />
<img width="1362" height="636" alt="Screenshot 2026-09-24 232202" src="https://github.com/user-attachments/assets/d680b73c-9d29-4d60-9130-a9ad79eab329" />
<img width="1365" height="636" alt="Screenshot 2026-09-24 232217" src="https://github.com/user-attachments/assets/97081932-c6c3-49eb-bd00-a37c21f7dbbf" />
<img width="1365" height="632" alt="Screenshot 2026-09-24 232126" src="https://github.com/user-attachments/assets/1d6cafa9-e4ae-4139-b7df-fb77e7b48a00" />
