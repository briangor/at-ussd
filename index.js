const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("App is running");
});

app.post('/', (req, res) => {
    // Extract the POST data sent by AT gateway
    const sessionId = req.body.sessionId;
    const serviceCode = req.body.serviceCode;
    const phoneNumber = req.body.phoneNumber;
    const text = req.body.text;

    let response = ''; 

    if (text === "") {
        // First request
        response = "CON What would you want to check \n";
        response += "1. My Account Number \n";
        response += "2. My Phone Number \n";
    } else if (text === "1") {
        // First level response
        response = "CON Choose account information that you want to view \n";
        response += "1. Account Number \n";
        response += "2. Account Balance \n";
        response += "0. Back \n"; // Option to go back
    } else if (text === "2") {
        // Terminal response
        response = `END Your phone number is ${phoneNumber}`;
    } else if (text === "1*1") {
        // Second level response
        const accountNumber = "ACC1001";
        response = `END Your account number is ${accountNumber}`;
    } else if (text === "1*2") {
        const balance = "KES 887,650,000";
        response = `END Your balance is ${balance}`;
    } else if (text === "0") {
        // Go back to the main menu
        response = "CON What would you want to check \n";
        response += "1. My Account Number \n";
        response += "2. My Phone Number \n";
    }

    // Send the response back to the gateway
    res.set('Content-Type', 'text/plain');
    res.send(response);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
