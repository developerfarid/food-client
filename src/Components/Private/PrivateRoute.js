import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';



const PrivateRoute = ({ children, ...rest }) => {
    const { user, loding } = useAuth();
  let location=  useLocation()

    if (loding) { return (<Spinner animation="border" className='text-center' role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>)}
  if (user?.email) {
    return children;
}
return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;