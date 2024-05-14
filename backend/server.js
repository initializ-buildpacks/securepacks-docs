const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
const uuid = require('uuid');
const dotenv = require('dotenv')
const app = express();
const port = 3001;
dotenv.config()

// Enable CORS middleware
app.use(cors());

// AWS Configuration
AWS.config.update({
  accessKeyId: process.env.awsaccessKeyId,
  secretAccessKey: process.env.awssecretAccessKey,
  region: 'us-east-1'
});

// Create S3 instance
const s3 = new AWS.S3();

app.use(bodyParser.json());

// Endpoint to handle form submission
app.post('/submit-form', (req, res) => {
  const formData = req.body;

  // Generate a unique filename
  const fileName = `form-${uuid.v4()}.json`;

  // Convert form data to JSON string
  const jsonData = JSON.stringify(formData);

  // S3 parameters
  const params = {
    Bucket: 'betacustomers',
    Key: fileName,
    Body: jsonData
  };

  // Upload data to S3 bucket
  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error uploading file to S3' });
    }
    console.log('File uploaded successfully:', data.Location);
    return res.status(200).json({ message: 'Form data submitted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
