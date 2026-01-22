import React from 'react'
import HeroSection from '../../Components/DetailService/HeroSection'
import PropertyStructureSection from '../../Components/DetailService/PropertyStructureSection'
import SellpropertySection from '../../Components/DetailService/SellpropertySection'
import EngagementSection from '../../Components/DetailService/EngagementSection'
import EngagementScope from '../../Components/DetailService/EngagementScope'
import ModelBenefits from '../../Components/DetailService/ModelBenefits'
import SalesProcess from '../../Components/DetailService/SalesProcess'

function DetailService() {
  return (
    <div  className='pt-[100px] pb-10'>

    
        
        <HeroSection/>
        <PropertyStructureSection/>
        <EngagementSection/>
        <EngagementScope/>
        <SalesProcess/>
        <ModelBenefits/>
        <SellpropertySection/>
        
    </div>
  )
}

export default DetailService