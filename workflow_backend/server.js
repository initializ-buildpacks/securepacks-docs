const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const axiosRetry = require('axios-retry').default;
const { exponentialDelay } = require('axios-retry');
require('dotenv').config();

// Load environment variables from .env

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

axiosRetry(axios, { retries: 5, retryDelay: exponentialDelay }); // Retry on network errors



app.post('/trigger-workflow', async (req, res) => {
  const { imageName, repoUrl, desiredDirectory } = req.body;
  const token = process.env.TOKEN
console.log(token);
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

    // Poll for the workflow run status
    const workflowRunStatus = await pollWorkflowRunStatus(owner, repo, token);
    const workflowRunId = workflowRunStatus.id; // Fetch the workflow run ID from the workflow run status
    console.log('Workflow run ID:', workflowRunId);
    res.json({ message: 'GitHub Action triggered successfully!', workflowRunId });

  } catch (error) {
    console.error('Error triggering GitHub Action:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to trigger GitHub Action.' });
  }
});

async function pollWorkflowRunStatus(owner, repo, token) {
  const runsUrl = `https://api.github.com/repos/${owner}/${repo}/actions/runs`;

  let status = 'in_progress';
  let workflowRunStatus = {};

  while (status === 'in_progress' || status === 'queued') {
    try {
      const runsResponse = await axios({
        method: 'get',
        url: runsUrl,
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      const latestRun = runsResponse.data.workflow_runs[0];
      status = latestRun.status;
      workflowRunStatus = latestRun;

      console.log('Workflow run status:', status);

      if (status === 'in_progress' || status === 'queued') {
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds before checking again
      }
    } catch (error) {
      console.error('Error fetching workflow run status:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch workflow run status.');
    }
  }

  return workflowRunStatus;
}

app.get('/workflow-run-status/:id', async (req, res) => {
  const { id } = req.params;
  const token = process.env.TOKEN;
  const owner = process.env.OWNER;
  const repo = process.env.REPO;

  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/actions/runs/${id}`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    const status = response.data.status;
    console.log('Workflow run status:', status);
    res.json({ status });
  } catch (error) {
    console.error('Error fetching workflow run status:', error);
    res.status(500).json({ error: 'Failed to fetch workflow run status.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
