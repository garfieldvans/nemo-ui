import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@nemo/ui'
import '@nemo/ui/index.css'
import './index.css'
import './site.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
