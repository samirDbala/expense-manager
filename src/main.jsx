// react imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// styles
import './index.css'

// main app
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
