import React from 'react'
import HeroSection from '../../Components/ServiceIndividual3/HeroSection'
import Ourwork from '../../Components/ServiceIndividual3/Ourwork';
import AssetClassesCovered from '../../Components/ServiceIndividual3/AssetClassesCovered';
import EngagementWorks from '../../Components/ServiceIndividual3/EngagementWorks';
import AssetFramework from '../../Components/ServiceIndividual3/AssetFramework';
import GovernanceControls from '../../Components/ServiceIndividual3/GovernanceControls';
import LookingforAsset from '../../Components/ServiceIndividual3/LookingforAsset ';

function AssetStructuring() {
  return (
    <div className='pt-[100px] pb-10'>
      <HeroSection
        title={
          <>
            Asset  <br />
            Management <br />
            Structuring
          </>
        }
        description="Asset management is not about managing properties individually. It is about optimising real estate portfolios as financial assets, balancing income generation, risk management, cost discipline, and long-term value creation."
      />
     <Ourwork
  paragraphs={[
    'We work with portfolio owners, landlords, and investors to structure and oversee asset management frameworks across residential, commercial, and industrial properties, ensuring that each portfolio is managed with strategic intent rather than reactive decision-making.',
    'Our role is to act as the central strategic and coordination interface, supporting portfolio-level decisions and ensuring that execution aligns with defined financial and performance objectives.',
    'Execution is delivered through an appointed, RERA-licensed asset and property management platform, allowing investors to benefit from institutional-grade operations while retaining a single point of accountability.'
  ]}
/>


<AssetClassesCovered/>
<EngagementWorks/>
<AssetFramework/>
<GovernanceControls/>
<LookingforAsset/>

    </div>
  )
}

export default AssetStructuring;