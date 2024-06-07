import React, { useState } from 'react';
import axios from 'axios';

interface TriggerWorkflowResponse {
  message: string;
  workflowId: string;
}

interface WorkflowStatusResponse {
  status: string;
  conclusion: string;
  // Add other properties you want to display
}

const WorkflowComponent: React.FC = () => {
  const [imageName, setImageName] = useState<string>('');
  const [repoUrl, setRepoUrl] = useState<string>('');
  const [desiredDirectory, setDesiredDirectory] = useState<string>('');
  const [triggerResponse, setTriggerResponse] = useState<string>('');
  const [workflowId, setWorkflowId] = useState<string>('');
  const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatusResponse | null>(null);

 
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTriggerWorkflow = async () => {
    // Validate image name and repo URL
    if (!imageName || !repoUrl) {
      alert('Image name and repo URL are required.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post<TriggerWorkflowResponse>('https://workflow.stg.initz.run/trigger-workflow', {
        imageName,
        repoUrl,
        desiredDirectory,
      });
      setTriggerResponse(response.data.message);

      // Wait for 1 second to fetch the latest workflow run ID
      setTimeout(fetchLatestWorkflowId, 4000);
    } catch (error) {
      console.error('Error triggering workflow:', error);
      setTriggerResponse('Failed to trigger workflow.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLatestWorkflowId = async () => {
    try {
      const response = await axios.get('https://workflow.stg.initz.run/latest-workflow-id');
      const newWorkflowId = response.data.workflowId;
      setWorkflowId(newWorkflowId);

      // Start polling for workflow status every 10 seconds
      startPollingWorkflowStatus(newWorkflowId);
    } catch (error) {
      console.error('Error fetching latest workflow ID:', error);
    }
  };

  const startPollingWorkflowStatus = (workflowId: string) => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get<WorkflowStatusResponse>(`https://workflow.stg.initz.run/workflow-status`, {
          params: { run_id: workflowId },
        });

        setWorkflowStatus(response.data);
        console.log('Workflow status:', response.data);

        if (response.data.status === 'completed' || response.data.status === 'failed') {
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error('Error getting workflow status:', error);
      }
    }, 10000); // Poll every 10 seconds
  };

  return (
    <div>
      <h2>Trigger Workflow</h2>
      <form>
        <div className='form-container'>
          <label htmlFor="image-name">Image Name:</label>
          <input
            type="text"
            id="image-name"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            aria-label="Image Name"
            required
          />
          <label htmlFor="repo-url">Repo URL:</label>
          <input
            type="text"
            id="repo-url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            aria-label="Repo URL"
            required
          />
          <label htmlFor="desired-directory">Desired Directory:</label>
          <input
            type="text"
            id="desired-directory"
            value={desiredDirectory}
            onChange={(e) => setDesiredDirectory(e.target.value)}
            aria-label="Desired Directory"
          />
          <button type="button" onClick={handleTriggerWorkflow} disabled={isLoading}>
          {isLoading ? 'Triggering...' : 'Trigger Workflows'}
        </button>
          </div>
        
      </form>

      
      {workflowStatus && (
        <div>
          <h2 className='status'>
            Status: {workflowStatus.conclusion === 'cancelled' ? 'WorkFlow Cancelled' : workflowStatus.status}
          </h2>
          {/* Add other properties of the workflow status as needed */}
        </div>
      )}
    </div>
  );
};

export default WorkflowComponent;
