import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { AppContextProvider } from './context/AppContext.tsx'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: "#264653",
    },
    secondary: {
      main: "#2a9d8f",
    },
    info: {
      main: "#2a9d8f"
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <AppContextProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AppContextProvider>
  </StrictMode>,
)
