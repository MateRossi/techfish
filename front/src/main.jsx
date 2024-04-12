import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ReadingsProvider from './context/ReadingsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReadingsProvider>
      <App />
    </ReadingsProvider>
  </React.StrictMode>,
)
