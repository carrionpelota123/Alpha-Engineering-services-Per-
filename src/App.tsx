import { Background } from './components/Background'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { About } from './components/About'
import { Sectors } from './components/Sectors'
import { Process } from './components/Process'
import { Coverage } from './components/Coverage'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ChatWidget } from './components/ChatWidget'

function App() {
  return (
    <>
      <Background />
      <Nav />
      <main>
        <Hero />
        <Services />
        <About />
        <Sectors />
        <Process />
        <Coverage />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}

export default App
