import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import AppRouter from './router/router.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <AppRouter />
        <Toaster position='bottom-center' richColors/>
    </BrowserRouter>
  </React.StrictMode>
)
