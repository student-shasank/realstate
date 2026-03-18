import React from 'react'
import HeroSection from '../Components/ServicePageComponents/HeroSection'
import ServiceCard from '../Components/ServicePageComponents/ServiceCard'
import SellProperty from '../Components/ServicePageComponents/SellProperty'

function Service() {
  return (
    <div class="pb-10 pt-[100px] md:pt-[160px]">
        <HeroSection/>
        <ServiceCard/>
        <SellProperty/>
    </div>
  )
}

export default Service