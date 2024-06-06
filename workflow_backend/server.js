const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const axiosRetry = require('axios-retry').default;
const { exponentialDelay } = require('axios-retry');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

// Load environment variables from .env

const app = express();
const port = 3001;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST'],
  },
});

app.use(bodyParser.json());
app.use(cors());

axiosRetry(axios, { retries: 5, retryDelay: exponentialDelay }); // Retry on network errors

app.post('/trigger-workflow', async (req, res) => {
  const { imageName, repoUrl, desiredDirectory } = req.body;
  const token = process.env.TOKEN;
  const owner = process.env.OWNER;
  const repo = process.env.REPO;
  const workflow_id = process.env.WORKFLOW_ID;

  try {
    const triggerResponse = await axios({
      method: 'post',
      url: `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/dispatches`,
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      data: {
        ref: 'main',
        inputs: {
          image_name: imageName,
          repo_url: repoUrl,
          desired_directory: desiredDirectory
        }
      }
    });

    console.log('Workflow triggered:', triggerResponse.data);

    // Send immediate response
    res.json({ message: 'GitHub Action triggered successfully!' });
  } catch (error) {
    console.error('Error triggering GitHub Action:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to trigger GitHub Action.' });
  }
});

app.post('/workflow-status', (req, res) => {
  const { run_id, status } = req.body;

  // Emit the status to connected clients
  io.emit('workflowStatus', { id: run_id, status });

  res.sendStatus(200);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
