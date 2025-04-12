import Hero from '../components/Hero'
import Features from '../components/Features'
import GetStarted from '../components/GetStarted'
import UserReview from '../components/UserReview'
import Trusted from '../components/Trusted'
import FaqSection from "../components/Faq";
import Footer from '../components/Footer'
const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />      
      <Features />
      <UserReview />
      <Trusted />
      <FaqSection />
      <GetStarted />
      <Footer />
    </div>
  )
}

export default Home