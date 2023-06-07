const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');
const PDFParser = require('pdf-parse');
const cors = require('cors');



app.use(bodyParser.json());
app.use(cors())
let records = [];

//Get all students
router.get('/', (req, res) => {
  res.send('App is running..');
});

router.post('/extract-pdf', async (req, res) => {
  console.log("runing")
  const { url } = req.body;

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    });

    const pdfBuffer = Buffer.from(response.data, 'binary');

    const data = await PDFParser(pdfBuffer);

    res.send(data.text);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
