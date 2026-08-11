import React from 'react'
import HeroSection from '../Components/ServicePageComponents/HeroSection'
import ServiceCard from '../Components/ServicePageComponents/ServiceCard'
import SellProperty from '../Components/ServicePageComponents/SellProperty'

function Service() {
  return (
    <div class="pb-10 pt-[80px] md:pt-[80px]">
        <HeroSection/>
        <ServiceCard/>
        <SellProperty/>
    </div>
  )
}

export default Service