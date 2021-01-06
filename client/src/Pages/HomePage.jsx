import React from 'react'
import HomeBanner from '../Components/HomeDetails/HomeBanner'
import HomeFeatured from '../Components/HomeDetails/HomeFeatured'
import HomeServices from '../Components/HomeDetails/HomeServices'
// import HomeSponsors from '../Components/HomeDetails/HomeSponsors'




const HomePage = () => {
   return (
      <>
         <HomeBanner />
         <HomeServices />
         <HomeFeatured />
         {/*<HomeSponsors />*/}
      </>
   )
}

export default HomePage
