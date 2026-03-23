import Hero from '../components/Hero';
import Footer from '../components/Footer';
import SocialLinks from '../components/SocialLinks';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col">
      <div className="flex-1">
        <Hero />
        <SocialLinks />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
