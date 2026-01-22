import React from 'react'
import HeroSection from '../../Components/ServiceIndividual3/HeroSection'
import Ourwork from '../../Components/ServiceIndividual3/Ourwork';
import VisaProgramsOverview from '../../Components/Serviceindividual7/VisaProgramsOverview';

function InvestorVisaAdvisory() {
  return (
    <div>

 <div className='pt-[100px] pb-10'>

      <HeroSection
        title={
          <>
       Residency &<br /> Investor Visa <br /> Advisory (UAE)


          </>
        }
        description="We provide structured advisory support for investors, professionals, and retirees exploring long-term residency options in the UAE.
"
      />

<Ourwork
  paragraphs={[
    'This service is designed to help applicants understand eligibility pathways, investment requirements, and program suitability before proceeding with immigration execution through third-party service providers.',
    'Our role is to assess eligibility, structure the appropriate residency pathway, and coordinate introductions, ensuring applicants move forward with clarity, realistic expectations, and reduced risk.'
  ]}
/>
<VisaProgramsOverview/>

      </div>
        
    </div>
  )
}

export default InvestorVisaAdvisory