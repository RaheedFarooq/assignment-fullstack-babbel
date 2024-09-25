import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Onboarding from './pages/Onboarding';
import './main.module.scss';  

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Onboarding />
  </StrictMode>,
)
