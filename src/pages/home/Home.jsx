import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import Body from "../Body/Body";
import "./home.css";

const Home = () => {
  return (
    <div className='bg-[#eae6f5]'>
      <Navbar />
      {/* <Header /> */}
      <Body />
      <div className="homeContainer">
        {/* <Featured/> */}
        {/* <h1 className="homeTitle">Browse by property type</h1> */}
        {/* <PropertyList/> */}
        {/* <h1 className="homeTitle">Homes guests love</h1> */}
        {/* <FeaturedProperties/> */}
        <MailList/>
        <Footer/>
      </div>

      


    </div>
  );
};

export default Home;
