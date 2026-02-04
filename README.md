# Gemini AI Car Insurance Chat Bot

An AI-powered chat application that simulates a car insurance question-and-answer flow using Google’s Gemini API.  
The application dynamically generates follow-up questions based on user responses, creating an interactive and adaptive insurance-style chatbot experience.

---

## 📌 Project Overview

The **Gemini AI Car Insurance Chat Bot** is a full-stack web application designed to demonstrate how large language models can be used to guide users through a structured decision-making process.

The application collects answers from users, sends them to the Gemini API, and generates the next most relevant question dynamically — similar to how a real car insurance provider gathers information before producing a quote.

The purpose of this project was to:
- Integrate a large language model into a real application
- Design prompt-driven conversational logic
- Build a simple but functional frontend
- Handle API communication and error handling
- Containerise an application using Docker

---

## ✨ Features

- Interactive AI-driven question and answer flow
- Dynamic prompt generation based on user responses
- Gemini API integration
- Frontend UI built with HTML & CSS
- Graceful error handling for API and UI failures
- Fully containerised using Docker and Docker Compose

---

## 🛠 Tech Stack

**Frontend**
- HTML
- CSS
- TypeScript

**Backend / AI**
- Node.js
- Google Gemini API
- Prompt engineering

**DevOps**
- Docker
- Docker Compose

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm
- Docker & Docker Compose
- Gemini API key

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/HamFeet/Gemini-AI-Car-Insurance-Chat-Bot.git
   cd Gemini-AI-Car-Insurance-Chat-Bot
2. **Set up environment variables**
   ```bash
   GEMINI_API_KEY=your_api_key_here
3. **Run using Docker**
   ```bash
   docker compose up --build
4. **Open your browser at:**
   ```bash
   http://localhost:3000
