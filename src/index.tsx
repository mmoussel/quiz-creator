import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'

import { ThemeProvider } from '@mui/material'
import theme from './theme'
import { BrowserRouter } from 'react-router-dom'
import { QuizzesProvider } from './contexts'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <QuizzesProvider>
          <App />
        </QuizzesProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
