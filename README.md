# 🎓 ICU Virtual Assistant

Welcome to the **ICU Virtual Assistant**! This is a smart, interactive chatbot widget built completely from scratch for the Information and Communications University (ICU) Zambia portal. 

We built this project to make life easier for students, prospective applicants, and staff. Instead of digging through web pages to find out how much tuition is or where the campus is located, you can just ask our friendly virtual assistant!

## ✨ What Does It Do?
The Assistant acts as a floating chatbot widget on the university website. It's smart enough to understand what you're asking about, even if you just type a single word like **"apply"**, **"fees"**, or **"scholarship"**. 

Here are some of the things it can help you with out of the box:
- 🏫 **Admissions:** Information about how to apply, required documents, and sponsorship opportunities.
- 💰 **Fees & Payments:** The most up-to-date tuition fees, application costs, and registration payments.
- 📚 **Academics:** Details about our Bachelor's, Master's, and Diploma programs across various faculties.
- 📍 **General Info & Contact:** The university mission, campus addresses, hotlines, and support emails.

Oh, and if the bot shares a link with you, it's fully clickable so you can jump right to the page you need! Plus, it has a beautiful **Dark Mode** toggle for those late-night study sessions! 🌙

## 💻 How It Was Built
This project is built to be modern, incredibly fast, and easy to maintain. 
- **React (Vite):** The blazing-fast frontend framework powering the user interface.
- **Tailwind CSS v4:** For that beautiful, responsive, modern styling.
- **Custom NLP Model:** A lightweight, keyword-matching JSON search engine. No heavy machine learning servers required!

## 🚀 Getting Started

If you want to run this project on your own machine, it's super simple!

1. Make sure you have [Node.js](https://nodejs.org/) installed on your computer.
2. Clone or download this project folder.
3. Open your terminal in the project folder and install the dependencies:
   ```bash
   npm install
   ```
4. Start up the development server:
   ```bash
   npm run dev
   ```
5. Click the local server link (usually `http://localhost:5173`) and say hi to the bot!

## 🧠 Customizing the "Brain"
The coolest part about this bot is how easy it is to teach it new things! Our entire knowledge base lives in a single file:  `src/data/knowledgeBase.json`.

If you ever need to update tuition fees or add a new FAQ, simply open that file and plug in your new question keywords and the custom answer. The bot will instantly learn it!

---
*Built with ❤️ for ICU Zambia.*
