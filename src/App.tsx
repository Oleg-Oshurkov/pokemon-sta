import { Route, Routes } from 'react-router-dom'
import { WelcomePage } from './pages/WelcomePge'
import { SearchPage } from './pages/SearchPage'
import { Page404 } from './pages/Page404'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import './App.css'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route index element={<WelcomePage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
