require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const express = require('express');
const app = express();

const cors=require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("hello");
});


app.post('/send', async(req, res) => {

    let { value } = req.body;            //destrucring the value from the body

    value += "\n\n find errors if any. Add emojis too for wrong and right answers. \n\n";

    const result = await model.generateContent(value);

    res.send({ msg: result.response.text() });
});


app.listen(process.env.PORT, (req,res)=>
{
    console.log("server is running on port", process.env.PORT);
});