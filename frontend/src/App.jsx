import React from 'react'

import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App
