import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col">
      <div className="flex-1">
        <Hero />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
