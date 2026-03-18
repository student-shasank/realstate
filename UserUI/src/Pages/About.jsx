import React from 'react'
import Hero from '../Components/About/Hero'
import DeveloperAccess from '../Components/About/DeveloperAccess'
import PlatformManagement from '../Components/About/PlatformManagement'
import DisclaimerSection from '../Components/About/DisclaimerSection'

function About() {
  return (
    <div className=' pt-[60px] sm:pt-[100px] '>
      <Hero/>
  <DeveloperAccess/>
  <PlatformManagement/>
  <DisclaimerSection/>
    </div>
  )
}

export default About