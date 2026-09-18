import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import FloatingUtilities from './components/FloatingUtilities'

function App() {
  return (
    <div className="min-h-screen bg-[#FFF9F0] text-[#24332B] font-body flex flex-col relative">
      {/* Sticky Top Navigation Bar */}
      <Navbar />

      {/* Main One-Page Content */}
      <main className="flex-1">
        <Home />
      </main>

      {/* Structured Footer */}
      <Footer />

      {/* Floating Circular Utility Buttons (Scroll to Top, Call, WhatsApp) */}
      <FloatingUtilities />
    </div>
  )
}

export default App





