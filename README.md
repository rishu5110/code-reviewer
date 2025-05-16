# Code Review AI

An intelligent code analysis tool that provides instant feedback on your code using AI-powered suggestions and tracks your coding progress.

## 🚀 Features

- Real-time code analysis using Google's Gemini AI
- User authentication (signup/login)
- Progress tracking for completed questions
- AI-powered code review suggestions
- Error detection and explanation with emojis
- Dark mode interface
- Responsive design

## 🛠️ Tech Stack

### Frontend

- React (v19)
- React Router DOM (v7)
- Tailwind CSS
- Framer Motion
- React Calendar Heatmap
- React Icons
- Vite

### Backend

- Node.js
- Express.js
- MongoDB (with Mongoose)
- Google Generative AI (Gemini 2.0)
- CORS
- Dotenv for configuration
- Body Parser

## 📁 Project Structure

```
code-reviewer/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── CodeReview.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Documentation.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LeetDaily.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── app.js
    ├── databasse.js
    ├── userModel.js
    ├── .env
    └── package.json
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/rishu5110/code-reviewer.git
cd code-reviewer
```

2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

3. Install Backend Dependencies

```bash
cd backend
npm install
```

4. Set up Environment Variables

Create a `.env` file in the backend directory with:

```
GOOGLE_API_KEY=your_gemini_api_key_here
PORT=3000
MONGO_URL=your_mongodb_connection_string
```

### Running the Application

1. Start the Backend Server

```bash
cd backend
node app.js
```

2. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## 🤝 Contributing

We welcome contributions to Code Review AI! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Write clear, descriptive commit messages
- Comment your code where necessary
- Follow the existing code style
- Update documentation as needed

## 📞 Contact

- Email: rishugoyal290404@gmail.com
- Address: Chitkara University

## 🙏 Acknowledgments

- Google Generative AI for providing the code analysis capabilities
- React and Tailwind CSS communities for the frontend tools
- MongoDB Atlas for database hosting
- All contributors who help improve this project

## 🔮 Future Enhancements

- [ ] Support for more programming languages
- [ ] Code formatting suggestions
- [ ] Integration with GitHub repositories
- [ ] Enhanced user progress analytics
- [ ] Custom AI review rules configuration
- [ ] Collaborative code review features
