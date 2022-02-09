import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import ContextProvider from './Components/Context/ContextProvider';
import AddFood from './Components/DeshBoard/AddFood';
import AddStudent from './Components/DeshBoard/AddStudent';
import DeshBoard from './Components/DeshBoard/DeshBoard';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/Private/PrivateRoute';
import AdminRoute from "./Components/Private/AdminRoute"
import Student from './Components/DeshBoard/Student';
import Serve from './Components/DeshBoard/Serve';
import Food from './Components/DeshBoard/Food';
import MakeAdmin from './Components/DeshBoard/MakeAdmin';
import Welcome from './Components/DeshBoard/Welcome';

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="deshboard" element={<PrivateRoute><DeshBoard></DeshBoard></PrivateRoute>}>
          <Route path="/deshboard/welcome" element={<Welcome />} />
            <Route element={<AdminRoute><AddStudent /></AdminRoute>} path="/deshboard/addStudent" />
            <Route element={<AdminRoute><Student /></AdminRoute>} path="/deshboard/Student" />
            <Route element={<AdminRoute><Food /></AdminRoute>} path="/deshboard/Food" />
            <Route element={<AdminRoute><AddFood /></AdminRoute>} path="/deshboard/AddFood" />
            <Route element={<AdminRoute><Serve /></AdminRoute>} path="/deshboard/Serve" />
            <Route element={<AdminRoute><MakeAdmin /></AdminRoute>} path="/deshboard/admin" />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
