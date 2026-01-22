import React from 'react'
import HeroSection from '../../Components/ServiceIndividual3/HeroSection'
import Ourwork from '../../Components/ServiceIndividual3/Ourwork';
import ServiceCover from '../../Components/Serviceindividual5/ServiceCover';

function HandoverSnagging() {
  return (
    <div>

       <div className='pt-[100px] pb-10'>

      <HeroSection
        title={
          <>
          Handover &  <br />Snagging  <br />Representation

          </>
        }
        description="Handover and snagging is an optional, one-time service designed to support buyers and owners at the point a property is delivered, helping ensure the unit is accepted in the best possible condition.
"
      />


      <Ourwork
      paragraphs={[
  'While brokers facilitate the transaction and handover logistics, this service focuses specifically on quality inspection and defect identification, providing an independent and structured layer of assurance at the most critical stage of ownership transfer.',
  'The objective is to identify and document issues before handover acceptance, when rectification can be enforced as part of delivery rather than becoming a post-handover follow-up.',
  'This is not a sales, brokerage, or property management service. It exists solely to support quality control, documentation, and risk reduction at handover.'
]}

      />
      </div>
      <ServiceCover/>

        
    </div>
  )
}

export default HandoverSnagging