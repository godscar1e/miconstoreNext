import "./styles/_vars.scss";
import "./styles/globals.scss";
import Header from '../components/Header';
import MainContent from '../components/HomePage/MainContent';
import Footer from '../components/Footer/Footer';

// import { auth } from "@/auth";
// import { redirect } from "next/navigation";
const Home = async () => {

  return (
    <div className="wrapper">
      {/* <SessionProvider> */}
      <Header />
      {/* </SessionProvider> */}
      <MainContent />
      <Footer />
    </div>
  );
}

export default Home;