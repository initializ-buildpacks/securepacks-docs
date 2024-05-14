import React, { useState } from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Dialog from '@mui/material/Dialog';
import CodeBlock from '@theme/CodeBlock';
import { Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import './style.css';
import { useHistory } from 'react-router-dom'


function Dialog1() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    source: '',
  });

  
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://securepacks-docs.onrender.com/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setLoading(false);
        console.log('Form submitted successfully');
        handleClose();
        history.push('/docs/introduction');

      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      {/* This is the button/link that should open the dialog */}
      <Button onClick={handleClickOpen} sx={{backgroundColor: "primary"}}>Explore Documentation</Button>
      <Dialog open={open} onClose={handleClose}>
        <div className="form-container">
          <div className="header">
            <h1>Feedback Form</h1>
            <p>We value your feedback. Please fill out the form below.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" required />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                type="email"
              />
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <label
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  lineHeight: '1.25rem',
                }}
                htmlFor="source"
              >
                Source *
              </label>
              <select name="source" value={form.source} onChange={handleChange} required className="custom-select">
                <option value="">Select an option</option>
                <option value="google">Google</option>
                <option value="friend">Friend</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="submit-btn">
              <button type="submit">
                {loading ? (
                  <>
                    <CircularProgress size="1.2rem" color="secondary" style={{ marginRight: '5px' }} />
                    Submitting
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
}

export default Dialog1;
