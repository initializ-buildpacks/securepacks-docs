import React, { useState } from 'react';
import axios from 'axios';
import CommandCopy from './CommandCopy';
// import LinearWithValueLabel from './ProgressBar';
import CveCheck from './CveCheck';
import "./style.css"

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
  const [status, setStatus] = useState<string>("");
  const [progress, setProgress] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [imageNameCli, setImageNameCli] = useState('');


 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // console.log(status);

  const handleTriggerWorkflow = async () => {
    setErrorMessage('');
    setStatus("In Progress");
    setProgress(true)

    const regex = /[^a-zA-Z0-9 -]/g;

    if (regex.test(imageName)) {
      setErrorMessage('You cannot use special characters');
      return;
    }

    // Validate image name and repo URL
    if (!imageName || !repoUrl) {
      alert('Image name and repo URL are required.');
      return;
    }

    
    
    setIsLoading(true);
    const imageNameModified = imageName.toLowerCase().replace(/\s+/g, '-');
    setImageNameCli(imageNameModified);

    try {
      
      const response = await axios.post<TriggerWorkflowResponse>('https://securepacks-docs-backend.vercel.app/trigger-workflow', {
        imageNameModified,
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
      const response = await axios.get('https://securepacks-docs-backend.vercel.app/latest-workflow-id');
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
        const response = await axios.get<WorkflowStatusResponse>(`https://securepacks-docs-backend.vercel.app/workflow-status`, {
          params: { run_id: workflowId },
        });

        setWorkflowStatus(response.data);
        // console.log('Workflow status:', response.data);

        
        if(response.data.conclusion === 'cancelled') setStatus("Cancelled")
        else if(response.data.conclusion === 'success') setStatus("Completed")
        // else setStatus("In progress")

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
      <h2>Build your Application with SecurePacks</h2>
      <form>
        <div className='form-container'>
          <label htmlFor="image-name">Image Name
          <input
            type="text"
            id="image-name"
            className='input-field'
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            aria-label="Image Name"
            required
          />
          <span>{errorMessage && <span style={{ color: 'red', fontSize: '10px'  }}>{errorMessage}</span>}</span>
          </label>

          <label htmlFor="repo-url">Repo URL</label>
          <input
            type="text"
            id="repo-url"
            className='input-field'
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            aria-label="Repo URL"
            required
          />
          <label htmlFor="desired-directory">Desired Directory</label>
          <input
            type="text"
            id="desired-directory"
            className='input-field'
            value={desiredDirectory}
            onChange={(e) => setDesiredDirectory(e.target.value)}
            aria-label="Desired Directory"
          />
          <button type="button" onClick={handleTriggerWorkflow} disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Image'}
        </button>
          </div>
        
      </form>


        <div> { status != "" && (
          <h2 className='status'>Status: {status}</h2>
        )}  </div>  


          
        {workflowStatus && workflowStatus.conclusion === 'success' && status != "" && status != "In Progress" && <CommandCopy command={`docker pull naveen871/${imageNameCli}`}/>}

        {/* {progress && <LinearWithValueLabel status={status}/>} */}

        {workflowStatus && workflowStatus.conclusion === 'success' && <CveCheck imageName={"naveen871/" + imageNameCli}/>}        
   
    </div>
  );
};

export default WorkflowComponent;
