import Hero from '../components/Hero'
import Features from '../components/Features'
import GetStarted from '../components/GetStarted'
import Stats from '../components/Stats'
import UserReview from '../components/UserReview'
import Trusted from '../components/Trusted'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />      
      <Features />
      <UserReview />
      <Trusted />
      <GetStarted />
    </div>
  )
}

export default Home