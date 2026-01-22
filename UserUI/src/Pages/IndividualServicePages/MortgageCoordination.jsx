import React from 'react'
import HeroSection from '../../Components/ServiceIndividual3/HeroSection'
import Ourwork from '../../Components/ServiceIndividual3/Ourwork'
import MortgageApplicability from '../../Components/Serviceindividual6/MortgageApplicability'

function MortgageCoordination() {
  return (
   <>
   <div className='pt-[100px] pb-10'>

    <HeroSection
        title={
          <>
          Mortgage 
          <br />Coordination


          </>
        }
        description="We support property buyers and investors by facilitating the mortgage process through structured introduction and coordination with licensed mortgage advisors, ensuring financing discussions are aligned with the property transaction.

"
      />

<Ourwork
  paragraphs={[
    'Our role is to act as the initial point of contact, collecting basic information, setting expectations, and connecting clients with appropriate licensed mortgage professionals who are authorised to provide lending advice and financing solutions in the UAE.',
    'We do not provide mortgage advice, rate comparisons, or lending recommendations. All mortgage structuring, eligibility assessment, and financing advice are provided directly by licensed mortgage advisors and financial institutions.'
  ]}
/>
<MortgageApplicability/>
</div>
   </>
  )
}

export default MortgageCoordination