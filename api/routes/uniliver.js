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
    myHeaders.append("client_id", process.env.CLIENTID);
    myHeaders.append("client_secret", process.env.CLIENTSECRET);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "firstName": "My name",
    "lastName": "my last",
    "mobile": "01000100001",
    "email": "testing@mail.com"
    });

    var raw2 = JSON.stringify({
            "profile": {
                "header": {
                "isoLanguage": "EN",
                "isoCountry": "GB",
                "brandCode": "BH0162",
                "campaignId": "CN000631",
                "origin": "Website",
                "formType": "Sign Up",
                "entity": "PRM 2.6"
                },
            "consumerIdentity": {
                "unileverId": "12345678",
                "hashedUnileverId": "A1B2C3D4E5",
                "firstName": "My name",
                "lastName": "Joe",
                "middleName": "Anothony",
                "preferredName": "Joe",
                "honorificPrefix": "Mr",
                "honorificSuffix": "OBE",
                "gender": "M",
                "dateOfBirth": "2000-05-24"
                },
            "contactDetail": {
                "email": "joeistesting@gmail.com",
                "mobileNumber": "07710006635",
                "address": {
                    "houseNameOrNumber": "1",
                    "addressLine1": "1 Street Name",
                    "addressLine2": "Village",
                    "cityName": "Dhaka",
                    "postalCode": "AB12C34",
                    "stateOrProvince": "AB",
                    "addressCountry": "GB"
                    }
            },
        
            "optInStatus": {
                "brandEmailConsent": true,
                "brandSMSConsent": true,
                "unileverEmailConsent": true,
                "unileverSMSConsent": true,
                "legalAgeConsent": true
                },
            "additionalSubscription": [
                    {
                    "serviceId": "",
                    "optIn": true
                    }
                ],
            "questionAndAnswers": [
                    {
                    "questionId": 10,
                        "answerId": [
                        5678,
                        9121
                        ],
                    "answerText": "Example answer"
                    }
                ]
            }
    })

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw2,
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