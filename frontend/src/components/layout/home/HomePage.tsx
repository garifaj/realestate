import AgentSection from "./AgentSection";
import ContactUsSection from "./ContactUsSection";
import Footer from "./Footer";
import Header from "./Header"
import HowItWorksSection from "./HowItWorksSection";
import PropertiesSection from "./PropertiesSection";


const HomePage = () => {
  return (
    <>
      <Header/>
      <HowItWorksSection/>
      <PropertiesSection/>
      <AgentSection/>
      <ContactUsSection/>
      <Footer/>
    </>
  )
}

export default HomePage;
