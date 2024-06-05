import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface WorkflowResponse {
  message: string;
  workflowRunId: string;
}

interface WorkflowStatusResponse {
  status: string;
}

const WorkFlow: React.FC = () => {
  const [imageName, setImageName] = useState<string>('');
  const [repoUrl, setRepoUrl] = useState<string>('');
  const [desiredDirectory, setDesiredDirectory] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [workflowStatus, setWorkflowStatus] = useState<string>('');

  const [workflowRunId, setWorkflowRunId] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post<WorkflowResponse>('http://localhost:3001/trigger-workflow', {
        imageName,
        repoUrl,
        desiredDirectory,
      });

      setMessage(response.data.message);
      setWorkflowRunId(response.data.workflowRunId);
      console.log('Workflow run ID:', response.data.workflowRunId);
    } catch (error) {
      setMessage('Failed to trigger GitHub Action.');
      console.error('Error:', error);
    }
  };

  const handleGetStatus = async () => {
    try {
      const response = await axios.get<WorkflowStatusResponse>(`http://localhost:3001/workflow-run-status/${workflowRunId}`);
      setWorkflowStatus(response.data.status);
    } catch (error) {
      console.error('Error fetching workflow status:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Image Name" value={imageName} onChange={(e: ChangeEvent<HTMLInputElement>) => setImageName(e.target.value)} required />
        <input type="text" placeholder="Repo URL" value={repoUrl} onChange={(e: ChangeEvent<HTMLInputElement>) => setRepoUrl(e.target.value)} required />
        <input type="text" placeholder="Desired Directory" value={desiredDirectory} onChange={(e: ChangeEvent<HTMLInputElement>) => setDesiredDirectory(e.target.value)} />
        <button type="submit">Trigger Workfl</button>
      </form>
      <button onClick={handleGetStatus}>Get Status</button>
      <p>{message}</p>
      <p>Workflow Status: {workflowStatus}</p>
    </div>
  );
}

export default WorkFlow;