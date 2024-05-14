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
const bucketName = 'securepacksbetacustomers';
const objectKey = 'data.json'; // Key of the JSON object in the S3 bucket

app.use(bodyParser.json());

// Endpoint to handle form submission
app.post('/submit-form', async (req, res) => {
  const formData = req.body;

  try {
    // Fetch existing JSON object from S3 bucket
    const existingData = await s3.getObject({ Bucket: bucketName, Key: objectKey }).promise();
    const existingJson = JSON.parse(existingData.Body.toString('utf-8'));


    // Merge new form data into existing JSON object
    const updatedJson = { ...existingJson, [uuid.v4()]: formData };
    // Upload updated JSON object back to S3 bucket
    await s3.upload({
      Bucket: bucketName,
      Key: objectKey,
      Body: JSON.stringify(updatedJson),
      ContentType: 'application/json'
    }).promise();

    res.status(200).json({ message: 'Form data submitted and merged successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});