import "./styles/_vars.scss";
import "./styles/globals.scss";
import Header from '../components/Header/Header';
import MainContent from '../components/HomePage/MainContent';
import Footer from '../components/Footer/Footer';

const Home = async () => {

  return (
    <div className="wrapper">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default Home;