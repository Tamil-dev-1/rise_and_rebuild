import React from 'react'

// import Navbar from './components/navbar/Navbar'
// import Footer from './components/footer/Footer'
import AppRoutes from './routes/AppRoutes'
import { ThemeProvider } from './ThemeContext'
import "./theme.css"

const App = () => {
  return (
    <div>
      <ThemeProvider>
      {/* <Navbar /> */}
      <AppRoutes />
      {/* <Footer /> */}
      </ThemeProvider>
    </div>
  )
}

export default App
