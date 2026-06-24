# Syntherra

## Overview

Syntherra is an AI-powered civilization simulation platform that demonstrates how Artificial Intelligence can be used to create a living, continuously evolving digital world.

Instead of following a fixed script, every civilization acts as an independent AI agent that analyzes its current situation and makes its own decisions. These decisions affect military strength, economy, diplomacy, population, and available resources, causing the entire world to change dynamically over time.

Because every decision influences future events, no two simulations are exactly the same. Each session creates a new story based on the interactions between AI-controlled civilizations and user actions.

The project combines Artificial Intelligence, real-time communication, backend architecture, cloud deployment, and an interactive frontend into a single full-stack application.

---

## Project Highlights

* AI-powered autonomous civilization simulation
* Real-time event broadcasting using WebSockets
* Dynamic wars and diplomatic alliances
* Interactive 3D globe visualization
* Live event feed with instant updates
* User-driven world influence
* Spring AI integration
* Cloud-hosted full-stack architecture
* Docker-based backend deployment
* Responsive React interface

---

## How Syntherra Works

The simulation begins with multiple civilizations, each having its own military strength, economy, food supply, oil reserves, population, happiness, and strategic behavior.

The backend continuously evaluates these values and determines how each civilization should respond to changing world conditions. Depending on its current state, a civilization may decide to strengthen its economy, prepare for conflict, cooperate with another nation, or react to global events.

Whenever an important decision is made, the backend immediately broadcasts the event to every connected user through WebSockets. The frontend receives these updates instantly and refreshes the interface without requiring a page reload.

Users can also influence the simulation by creating wars or alliances. Once a user performs an action, every AI-controlled civilization adapts its behavior based on the new world state, allowing the simulation to evolve naturally.

This creates a continuously changing environment where every action has long-term consequences.

---

## Artificial Intelligence

Syntherra is built using **Spring AI**, providing a modern foundation for integrating AI capabilities into enterprise Java applications.

The project demonstrates how AI can be combined with traditional backend systems to build intelligent simulations instead of simple rule-based applications. The architecture is designed so that more advanced Large Language Models (LLMs) can be integrated in future versions to make civilization decision-making even more sophisticated.

---

## Technology Stack

### Backend

* Java 17
* Spring Boot
* Spring AI
* Spring Data JPA
* Spring WebSocket
* Hibernate
* Maven

### Frontend

* React
* Vite
* Tailwind CSS
* Framer Motion
* React Globe GL
* SweetAlert2

### Database

* TiDB Cloud (MySQL)

### Deployment

* Docker
* Render
* Netlify

---

## System Architecture

```text
                React Frontend
                      │
        REST APIs + WebSockets
                      │
              Spring Boot Backend
                      │
      AI Simulation & Business Logic
                      │
            TiDB Cloud Database
```

---

## Technical Concepts Demonstrated

This project demonstrates practical experience with:

* Full Stack Application Development
* AI Integration using Spring AI
* Intelligent Simulation Systems
* Event-Driven Architecture
* Real-Time Communication using WebSockets
* REST API Development
* Cloud Deployment
* Docker Containerization
* Database Design with JPA and Hibernate
* Interactive Data Visualization
* Responsive User Interface Design

---

## What I Learned

While building Syntherra, I gained hands-on experience designing a complete full-stack system that combines AI, backend services, databases, and a modern frontend.

The project strengthened my understanding of REST APIs, WebSockets, Spring Boot architecture, Spring AI integration, Docker, cloud deployment, and real-time application design. It also helped me understand how AI-assisted systems can be integrated into enterprise applications while maintaining clean architecture and scalable design principles.

---

## Future Improvements

Future versions of Syntherra will focus on expanding the intelligence and realism of the simulation by introducing:

* Large Language Model (LLM) driven decision making
* Smarter diplomatic negotiations
* Historical simulation analytics
* Civilization ranking and scoring
* Multiplayer world influence
* Persistent simulation sessions
* Advanced economic and resource models

---

## Author

**Ganesh Hegde**

Syntherra was developed as a portfolio project to explore the combination of Artificial Intelligence, Spring AI, Java, React, WebSockets, Docker, cloud deployment, and real-time system design in a production-style full-stack application.
