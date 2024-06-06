import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

interface WorkflowStatus {
  id: string;
  status: string;
}

const App: React.FC = () => {
  const [imageName, setImageName] = useState<string>('');
  const [repoUrl, setRepoUrl] = useState<string>('');
  const [desiredDirectory, setDesiredDirectory] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [workflowRunId, setWorkflowRunId] = useState<string>('');
  const [workflowStatus, setWorkflowStatus] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001'); // Adjust the URL if needed
    setSocket(newSocket);

    newSocket.on('workflowStatus', (data: WorkflowStatus) => {
      setWorkflowRunId(data.id);
      setWorkflowStatus(data.status);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/trigger-workflow', {
        imageName,
        repoUrl,
        desiredDirectory,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to trigger GitHub Action.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Image Name"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Repo URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Desired Directory"
          value={desiredDirectory}
          onChange={(e) => setDesiredDirectory(e.target.value)}
        />
        <button type="submit">Trigger Workflow</button>
      </form>
      <p>{message}</p>
      {workflowRunId && (
        <p>Workflow Run ID: {workflowRunId}</p>
      )}
      {workflowStatus && (
        <p>Workflow Status: {workflowStatus}</p>
      )}
    </div>
  );
};

export default App;
