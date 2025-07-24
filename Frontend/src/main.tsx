import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/store.ts';
import { CustomThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <Provider store={store}>
  <BrowserRouter>
  <CustomThemeProvider>
    <App />
    </CustomThemeProvider>
  </BrowserRouter>
    </Provider>
  </StrictMode>,
)
