import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { appStore } from './app/store'
import { Toaster } from 'sonner'
import { useLoadUserQuery } from './features/api/authApi'
import FadeLoader from "react-spinners/FadeLoader";

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return (<>{isLoading ?  <FadeLoader  heightUnit={150} />:<>{children} </>}</> )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <Custom>
        <App />
        <Toaster />
      </Custom>
    </Provider>
  </StrictMode>,
)
