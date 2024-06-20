// src/components/AccessDenied.tsx

import React from 'react';

const AccessDenied: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Access Denied</h2>
      <p>You do not have permission to access this page.</p>
    </div>
  );
};

export default AccessDenied;
