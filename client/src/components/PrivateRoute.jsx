// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate, Outlet } from 'react-router-dom'


// function PrivateRoute() {
//     const {currentUser} = useSelector(state => state.user)
//   return (
//    currentUser ? <Outlet/> : <Navigate to={'/sign-in'}/>
//   )
// }

// export default PrivateRoute


import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

function PrivateRoute({ element }) {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? (
    element
  ) : (
    <Navigate to={'/sign-in'} replace={true} />
  );
}

export default PrivateRoute;
