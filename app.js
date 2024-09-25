// This is Used to import the Express Framework, Mongoose Library and the body-parser middleware in our project 

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// This is used to create our webapp along with a  new Web Server. APP is the main that will handle all the responses requests 
const app = express();


//Middleware in Express.js (and other web frameworks) is like a gatekeeper that sits between the incoming request and the final response. It can intercept, modify, or even terminate the request or response before it reaches the actual route handler.


// In simple Words: Miidleware ekta request k neye ota k nijer bibhinno Middlware Functions r through diye pass kre . eg: Authentication , Authorization, Parsing, Error Handling etc. Trpr jdi Sob kta functions pass hye jaye without being terminated then it passes on  to the Route handlers Eg: /about,/Contact,/Calculation/

//It is a Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Body-Parese generally is used to get the datas from the user submits [HTML]. and the urlencoded means that it will extract the data from th HTML Forms

// The extended: true is done so that it can allows us to handle more complex ds including parsing all the nested as well as objects and arrays 

app.set('view engine', 'ejs'); // Will are using EJS as our default Template Engine. EJS is used because it helps us to dynamically genearte HTML content and helps us to separate the Logic and the HTMl making it more organized and easier to handle

mongoose.connect('mongodb://127.0.0.1:27017/calculator', { useNewUrlParser: true, useUnifiedTopology: true });
//This will help us to connect the MOngoose with this Expres Project

const CalculationSchema = new mongoose.Schema({
    operation: String,
    result: Number
});

const Calculation = mongoose.model('Calculation', CalculationSchema);

app.get("/", (req, res) => {
    res.render('index', { result: null });
});


app.post('/calculate', async (req, res) => {

    const { num1, num2, operation } = req.body;
    let result;
    switch (operation) {
        case 'add':
            result = parseFloat(num1) + parseFloat(num2);
            break;
        case 'subtract':
            result = parseFloat(num1) - parseFloat(num2);
            break;
        case 'multiply':
            result = parseFloat(num1) * parseFloat(num2);
            break;
        case 'divide':
            if (parseFloat(num2) !== 0) {
                result = parseFloat(num1) / parseFloat(num2);
            } else {
                result = 'Cannot be divided by 0';
            }
            break;
        default:
            result='Invalid Operation';
            break;
    }
if(!isNaN(result)){
    const calc=new Calculation({operation,result});
    await calc.save();
}


res.render('index', { result });
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

