import * as express from 'express';
import * as bodyParser from 'body-parser';
import axios from 'axios';

const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({
    limit: '2mb'
}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE, PATCH');
    next();
});

const botRouter = express.Router({mergeParams: true});

// endpoint for talkie invoice
app.post('/api/receive', async (req, res) => {
    console.log('req.body',);
    const VoiceResponse = twilio.twiml.VoiceResponse;
    const response = new VoiceResponse();
    response.play("https://hackyeah-orlen.s3.eu-central-1.amazonaws.com/powitanie_orlen.mp3");
    response.gather({
            input: 'speech',
            action: `/api/text`,
            method: 'POST',
            language: 'pl-PL',
            speechTimeout: 'auto'
        }
    );
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(response.toString());
});

app.post('/api/text', async (req, res) => {
    console.log('powiedziałeś: ', req.body.SpeechResult);
    const nextStep = await axios.post("http://175c7689.ngrok.io/webhooks/rest/webhook", {
        message: req.body.SpeechResult,
        sender: req.body.CallSid
    });
    console.log('nextStep', JSON.stringify(nextStep.data[0].custom));
    const VoiceResponse = twilio.twiml.VoiceResponse;
    const response = new VoiceResponse();
    response.play(nextStep.data[0].custom[0].audio);
    response.gather({
            input: 'speech',
            action: `/api/text`,
            method: 'POST',
            language: 'pl-PL',
            speechTimeout: 'auto'
        }
    );
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(response.toString());
});

export default app;