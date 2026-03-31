import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Dashborad from './Dashborad.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Dashborad />
  </StrictMode>,
)
