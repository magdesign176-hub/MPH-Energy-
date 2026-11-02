import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initMode } from './mode'
import './styles.css'

initMode()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
