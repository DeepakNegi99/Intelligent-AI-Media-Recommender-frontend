import './App.css';
import { AppRoutes } from './routes';
import Navbar from './components/Navbar';
import  { useState } from 'react';
 
function App() {

  const [darkMode, setDarkMode] = useState(false);

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <Navbar darkMode={darkMode} onToggleTheme={handleToggleTheme} />
       <AppRoutes />
    </div>
    
  )
}

export default App;
