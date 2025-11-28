// react imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {GoogleOAuthProvider} from '@react-oauth/google'
// styles
import './index.css'

// main app
import App from './App.jsx'

const CLIENT_ID = import.meta.env.VITE_API_CLIENT_ID_GOOGLE

createRoot(document.getElementById('root')).render(

  <StrictMode>
      <GoogleOAuthProvider clientId = {CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
  </StrictMode>,
)
