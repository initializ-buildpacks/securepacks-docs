// src/components/ProtectedRoute.tsx
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
    const isAuthenticated = window.localStorage.getItem('key') === 'true';

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/AccessDenied" />
      }
    />
  );
};

export default ProtectedRoute;
