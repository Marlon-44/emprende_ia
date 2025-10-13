import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes.jsx'
import { ModulesProvider } from './context/ModulesProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModulesProvider>
      <AppRoutes>

      </AppRoutes>
    </ModulesProvider>
  </StrictMode>,
)
