import express from "express"; 
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";


const app = express();


// Middlewares
env.config();

app.use(cors()); // Cross Origin Resource Sharing:- used to share resources across different domains

app.use(bodyParser.json()); //parses the incoming request body and makes it accessible to the application.

// API configuration
const configuration = new Configuration({
    organization : "org-tAnTjM9HG23liuyqT3mtOh45",
    apiKey : process.env.API_KEY
});

const openai = new OpenAIApi(configuration);


// setting the app to listen on port 3080
app.listen("3080", () => console.log("Listening on port 3080!"))


// dummy route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// post route for making requests
app.post("/", async(req, res) => {
    const {message} = req.body

    try{

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 100,
            temperature: .5
        })
        res.json({message: response.data.choices[0].text})

    }catch(err){
        console.log(err)
        res.send(err).status(400)
    }
})