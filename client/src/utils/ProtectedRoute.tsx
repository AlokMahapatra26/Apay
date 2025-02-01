import { Navigate } from 'react-router-dom';

import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = localStorage.getItem('email');

  if (!user) {
    // User is not authenticated
    return <Navigate to="/login" />;
  }

  // User is authenticated
  return children;
};

export default ProtectedRoute;
