import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {DisplayGraph} from './Sigma.tsx'
import {MultiDirectedGraphView} from './GraphConstructor.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MultiDirectedGraphView />
    <App />
    <DisplayGraph/>
  </StrictMode>,
)
