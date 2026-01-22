import React from 'react'
import HeroSection from "../../Components/ServiceIndividual3/HeroSection.jsx"
import Ourwork from '../../Components/ServiceIndividual3/Ourwork.jsx'
import LifecycleFramework from '../../Components/ServiceIndividual4/LifecycleFramework.jsx'

function AdvisoryCoordination() {
  return (
    <div className='pt-[100px] pb-10'>

      <HeroSection
        title={
          <>
           Development 
 <br />
            Advisory and  <br />
           Project 
           
           Coordination
          </>
        }
        description="We support property owners and investors by structuring access to professional property management services delivered through appointed, RERA-licensed property management teams operating in the UAE market.."
      />


      <Ourwork
        paragraphs={[
        
  'Our role is to act as an advisory and coordination interface, helping define project structure, align stakeholders, and establish a clear execution pathway from early planning through construction and handover.',
  'All engagements are structured and onboarded through our advisory framework before execution, ensuring clarity of roles, accountability, and an organised transition into licensed execution.',
  'Execution is delivered through an appointed, RERA-licensed development and project management platform.'

        ]}
      />

      <LifecycleFramework/>

    </div>
  )
}

export default AdvisoryCoordination