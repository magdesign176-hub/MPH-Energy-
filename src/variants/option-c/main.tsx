import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initMode } from './mode'
import './styles.css'

// Set data-mode on <html> before the first render (dark unless the visitor chose light).
initMode()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
