import axios from "axios";
import { useState } from "react";
import ShowCveLogs from "./ShowCveLogs";
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

const CveCheck = ({imageName}) => {
    const [triggerResponse, setTriggerResponse] = useState<string>('');
    const [workflowId, setWorkflowId] = useState<string>('');
    const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatusResponse | null>(null);
    const [status, setStatus] = useState<string>("");

    const [cveData, setCveData] = useState([]);
    const [cveLoading, setCveLoading] = useState("rest");
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const handleCveLogs = async () => {
      setStatus("In progress")
        setIsLoading(true);

        try {
      
            const response = await axios.post<TriggerWorkflowResponse>('https://securepacks-docs-backend.vercel.app/trigger-cvecheck-workflow', {
              imageName
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
    }

    const fetchLatestWorkflowId = async () => {
        try {
          const response = await axios.get('https://securepacks-docs-backend.vercel.app/latest-cvecheck-workflow-id');
          const newWorkflowId = response.data.workflowId;
          setWorkflowId(newWorkflowId);
    
          // Start polling for workflow status every 10 seconds
          await startPollingWorkflowStatus(newWorkflowId);          

        } catch (error) {
          console.error('Error fetching latest workflow ID:', error);
        }
      };

    const startPollingWorkflowStatus = (workflowId: string) => {
      return new Promise<void>((resolve, reject) => {
        const intervalId = setInterval(async () => {
          try {
            const response = await axios.get<WorkflowStatusResponse>(`https://securepacks-docs-backend.vercel.app/cvecheck-workflow-status`, {
              params: { run_id: workflowId },
            });
    
            setWorkflowStatus(response.data);
            // console.log('Workflow status:', response.data);
    
            if(response.data.conclusion === 'cancelled') setStatus("Cancelled")
            else if(response.data.conclusion === 'success') setStatus("Completed")
            // else setStatus("In progress")
    
            if (response.data.status === 'completed' || response.data.status === 'failed') {
              clearInterval(intervalId);
              resolve();
            }
          } catch (error) {
            console.error('Error getting workflow status:', error);
            clearInterval(intervalId);
            reject(error);
          }
        }, 10000); // Poll every 10 seconds
      });
    };
      

    const getLogs = async () => {
      setCveLoading("loading")
      try {
        const res = await axios.get(`https://securepacks-docs-backend.vercel.app/get-cve-logs`);

        setCveData(res.data.matches);

        setCveLoading("loaded")
    
        // Process
      } catch (error) {
        console.error('Error fetching CVE logs:', error);
      }
    }

    return (
      <div>
        <div className="btn-conatiner">
          <button className="check-cve-btn" onClick={handleCveLogs}>{status == "In progress" ? "Getting..." : "Check CVEs"}</button>
          {workflowStatus && workflowStatus.conclusion === 'success' && <button className="get-cve-btn" onClick={getLogs}>{cveLoading == "loading" ? "Loading..." : "Show List"}</button>}
        </div>
        
        {cveLoading == "loaded" && <ShowCveLogs cveData={cveData}/>}
      
      </div>

    )
}

export default CveCheck;