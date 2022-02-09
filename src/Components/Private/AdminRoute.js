import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const AdminRoute = ({ children, ...rest }) => {
  const { user, admin, loading } = useAuth();
  console.log(loading);
    const location = useLocation();
    if (loading) { return(<Spinner animation="border" className='text-center' role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>)
  }
  console.log(admin);
    if (user?.email && admin?.role) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} />;

};

export default AdminRoute;