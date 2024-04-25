import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";

import NavLog from "../../components/navbar/navlog";
import {  useCookies } from "react-cookie";

import "./home.css";

const Home = () => {
// eslint-disable-next-line
const [cookies, setCookie] = useCookies(["user"]);
let getLogin = cookies?.user;
console.log('getLogin1', getLogin)

  return (
    <div>
      {getLogin?<NavLog />:<Navbar/>}
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
