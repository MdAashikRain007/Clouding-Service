import React, { useEffect } from 'react'

import {features} from '../assets/data'
import {pricingPlans} from '../assets/pricing'
import {testimonials} from '../assets/testimonials'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import HeroSection from '../component/lading/HeroSection'
import FeaturesSection from '../component/lading/FeaturesSection'
import Testimonials from '../component/lading/Testmonials'
import Footer from '../component/lading/Footer'
import CTASection from '../component/lading/CTASection'
import PriceingSection from '../component/lading/PriceingSection'

function Landing() {
  const {openSignIn,openSignUp} = useClerk();
  const {isSignedIn} = useUser();
  const navigate = useNavigate();

  useEffect(()=>{
    if(isSignedIn){
      navigate("/dashboard");
    }

  },[isSignedIn,navigate])
  return (
    <div className="landing-page bg-linear-to-b from-gray to-gray-100"> 
     {/* Hero Section */}
     <HeroSection openSignIn={openSignIn} openSignUp={openSignUp}/>

     {/* Features Section */}
     <FeaturesSection features={features} />

     {/* Pricing Section */}
     <PriceingSection pricingPlans={pricingPlans} openSignUp={openSignUp}/>

     
     {/* Testimoials Section */}
     <Testimonials testimonials={testimonials}/>
     {/* CTA Section */}
     <CTASection  openSignUp={openSignUp} />

  

     {/* Footer Section */}
     <Footer/>
    
    
    
    
    </div>

  )
}

export default Landing