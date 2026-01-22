import React from 'react'
import HeroSection from "../../Components/ServiceIndividual3/HeroSection.jsx"
import Ourwork from '../../Components/ServiceIndividual3/Ourwork.jsx'
import EngagementWorks from '../../Components/Serviceindividual2/EngagementWorks.jsx'
import PropertyManagementServices from '../../Components/Serviceindividual2/PropertyManagementServices.jsx'
import ModelWorks from '../../Components/Serviceindividual2/ModelWorks.jsx'
import Propertysale from '../../Components/Serviceindividual2/Propertysale.jsx'

function PropertyStructuring() {
  return (
    <div className='pt-[100px] pb-10'>


      <HeroSection 
         title={
          <>
            Property  <br />
            Management <br />
            Structuring
          </>
        }
        description="We support property owners and investors by structuring access to professional property management services delivered through appointed, RERA-licensed property management teams operating in the UAE market.."
     />


       <Ourwork
  paragraphs={[
    'Our role is to act as the initial engagement and access point, helping owners define management requirements, align expectations, and transition their assets into an appropriate licensed property management execution structure.',
    'We do not perform property management activities directly. Execution is delivered by appointed, RERA-licensed property management teams with established operational experience in the UAE market.',
    'Our role is to act as the initial engagement and access point, helping owners define management requirements, align expectations, and transition their assets into an appropriate licensed property management execution structure.',
    'We do not perform property management activities directly. Execution is delivered by appointed, RERA-licensed property management teams with established operational experience in the UAE market.'
  ]}
/>
<EngagementWorks/>
<PropertyManagementServices/>
<ModelWorks/>
<Propertysale/>
    </div>
  )
}

export default PropertyStructuring