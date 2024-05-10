import React, { useState } from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Dialog from '@mui/material/Dialog';
import CodeBlock from '@theme/CodeBlock';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import './style.css'

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}
const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    source: '',
    other: '',
    organization: '',
    purpose: '',
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  
    



  return (
    <Dialog onClose={handleClose} open={open}>
        <div className="form-container">
    <div className="header">
        <h1>Feedback Form</h1>
        <p>We value your feedback. Please fill out the form below.</p>
    </div>
    <form>
        <div className="input-group">
            <label >Name *</label>
            <input id="name" placeholder="Enter your name" required />
        </div>
        <div className="input-group">
            <label >Phone</label>
            <input id="phone" placeholder="Enter your phone number" />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input id="email" placeholder="Enter your email" type="email" />
        </div>
        <div style={{marginBottom: '0.5rem'}}>
  <label
    style={{
      fontSize: '0.875rem',
      fontWeight: '500',
      lineHeight: '1.25rem'
    }}
    htmlFor="source"
  >
    Source *
  </label>

  <select
    id="source"
    required
    className="custom-select"
>
    <option value="">Select an option</option>
    <option value="google">Google</option>
    <option value="friend">Friend</option>
    <option value="other">Other</option>
</select>
</div>
       
        <div className="submit-btn">
            <button type="submit">Submit</button>
        </div>
    </form>
</div>
  </Dialog>
  );
}

function Dialog1( ) {
  const [showDialog, setShowDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    source: '',
    other: '',
    organization: '',
    purpose: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };



  return (
    <>
      <Tabs defaultValue="tab1" groupId="tabs-example">
        <TabItem value="tab1" label="Sample Builder">
        <CodeBlock className="language-tsx" >
       {`pack build my-app --builder samplebuilder `}
   
  </CodeBlock>
        </TabItem>
        <TabItem value="tab2" label="Securepack" >
        <CodeBlock className="language-tsx">
        <span onClick={handleClickOpen} style={{cursor:"pointer" ,color:"#d2934c"}}>For using our builder</span>
  </CodeBlock>
        </TabItem>
      </Tabs>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
      
    </>
  );
}

export default Dialog1;