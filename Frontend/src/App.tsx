import { useState } from 'react';
import './App.css';
import { AppRoutes } from './routes';
import Navbar from './components/Navbar';
 
function App() {

  return (
    <div>
      <Navbar />
       <AppRoutes />
    </div>
    
  )
}

export default App;
