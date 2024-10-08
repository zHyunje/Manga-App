import React from 'react'
import AppRoutes from './stuff/Routes'
import { ThemeProvider } from 'styled-components'
import Global from './stuff/Global'
import { theme } from './stuff/theme'

const App = () => {
  return (
    // <AppRoutes />
    <ThemeProvider theme={theme}>
      <AppRoutes />
      <Global />
    </ThemeProvider>
  )
}

export default App
