import CommunitiesOverview from "../../Components/Communities/CommunitiesOverview"
import Hero from "../../Components/Communities/Hero"
import MarketData from "../../Components/Communities/MarketData"
import MarketSupply from "../../Components/Communities/MarketSupply"



function Communities() {
  return (
  
<div className='pt-[160px] pb-10'>
<Hero/>
<CommunitiesOverview/>
<MarketData/>
<MarketSupply/>
</div>

   
  )
}

export default Communities