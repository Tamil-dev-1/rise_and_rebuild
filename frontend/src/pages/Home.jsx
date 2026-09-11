import React from 'react'
import HeroSection from '../sections/hero/HeroSection'
import HeroImage from '../assets/images/hero/heroImg.png'
import Story from '../sections/hero/story/Story'
import StoryBG from '../assets/images/story/storybg.png'
import Series from '../sections/series/Series'
import Meaning from '../sections/meaning/Meaning'
import SeasonTrans from '../sections/season1to2/SeasonTrans'
import Achievement from '../sections/achivement/Achivement'
import SeasonTeaser from '../sections/seasonTeaser/SeasonTeaser'
import WhoIsIt from '../sections/whosIsFor/WhoIsIt'
import Mindset from '../sections/mindset/Mindset'
import Founder from '../sections/founder/Founder'
import Testimonial from '../sections/testimonial/Testimonial'
import BigQuestion from '../sections/bigQuestions/BigQuestions'
import Reveal from '../sections/reveal/Reveal'
import FinalCTA from '../sections/finalCTA/FinalCTA'
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const Home = () => {
  return (
    <div>
      {/* header */}
      <Navbar />
      <HeroSection imageSrc={HeroImage} />
      <Story imageSrc= {StoryBG} />
      <Series />
      <Meaning />
      <SeasonTrans />
      <Achievement />
      <SeasonTeaser />
      <WhoIsIt />
      <Mindset />
      <Founder />
      <Testimonial />
      <BigQuestion />
      <Reveal />
      <FinalCTA />

      {/* footer */}
      <Footer />
    </div>
  )
}

export default Home;
