import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ReadingsProvider from './context/ReadingsContext.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReadingsProvider>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </ReadingsProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
