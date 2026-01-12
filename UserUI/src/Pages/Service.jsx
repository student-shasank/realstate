import React from 'react'
import HeroSection from '../Components/ServicePageComponents/HeroSection'
import ServiceCard from '../Components/ServicePageComponents/ServiceCard'
import SellProperty from '../Components/ServicePageComponents/SellProperty'

function Service() {
  return (
    <div className='pt-[160px] pb-10'>
        <HeroSection/>
        <ServiceCard/>
        <SellProperty/>
    </div>
  )
}

export default Service