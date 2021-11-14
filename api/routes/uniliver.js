require('dotenv').config();
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/testing', (req, res, next) => {
    console.log("Here!")
    res.status(200).json({
        status: 200,
        message: "Success!"
    });
});

router.get('/create', (req, res, next) => {
    
    var myHeaders = new fetch.Headers();
    myHeaders.append("client_id", "9d25971a3c204bf18d7c352115dc9c7c");
    myHeaders.append("client_secret", "FbB1134Ce0FC415492e281E19561C030");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "firstName": "My name",
    "lastName": "my last",
    "mobile": "01676349496",
    "email": "muntasir@gmail.com"
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://qaprm.unileverservices.com/consumer-interaction-experience-qa-100/api/consumer_interaction_create", requestOptions)
    .then(response => response.json())
    .then(result => {

        console.log(result);

        res.status(200).json(result);

    })
    .catch(error => console.log('error', error));
});

module.exports = router;