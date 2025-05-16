require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("hello");
});


app.post('/send', async (req, res) => {

    let { ss } = req.body;            //destrucring the value from the body

    ss += "\n\n find errors and explain in clarify way. Add emojis too . \n\n";

    const result = await model.generateContent(ss);

    res.send({ msg: result.response.text() });
});


const userModel = require('./userModel');
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email);
    await userModel.create({
        username,
        email,
        password
    })
    console.log("User added Successfully");
    res.status(200).json({
        success: true,
        message: "User added",
    })
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDetail = await userModel.findOne({ email });

    if (!userDetail) {
        return res.status(401).json({
            success: false,
            message: "User not found"
        });
    }

    if (userDetail.password === password) {
        res.status(200).json({
            success: true,
            message: "User login successful",
            username: userDetail.username
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    }
})

app.post('/complete-question', async (req, res) => {
    const { email, question } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check if question already exists
        const questionExists = user.questions.some(q => q.qid === question.qid);
        if (!questionExists) {
            await userModel.findOneAndUpdate(
                { email },
                { $push: { questions: question } }
            );
        }

        res.status(200).json({
            success: true,
            message: "Question marked as completed"
        });
    } catch (error) {
        console.error('Error completing question:', error);
        res.status(500).json({
            success: false,
            message: "Error marking question as complete"
        });
    }
});

app.get('/user-progress/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            questions: user.questions
        });
    } catch (error) {
        console.error('Error fetching user progress:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching user progress"
        });
    }
});

const connectDb = require('./databasse');
connectDb();

app.listen(process.env.PORT, (req, res) => {
    console.log("server is running on port", process.env.PORT);
});