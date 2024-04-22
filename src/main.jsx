import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
// import 'dotenv/config'
import AppRouter from './router/router.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <main>
        <AppRouter />
      </main>
      <Toaster position='bottom-center' richColors/>
    </BrowserRouter>
)
