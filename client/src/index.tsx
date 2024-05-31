import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import ExpenseTracker from './components/ExpenseTracker';
import ShowList from './components/ShowList';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
    <Routes>
      <Route path='/' element={< ExpenseTracker onClose={()=>{}} onTrue={()=>{}}/>}></Route>
      <Route path="/home" element={ < ShowList />}></Route>
    </Routes>
  </Router>
  </React.StrictMode>
  
);


