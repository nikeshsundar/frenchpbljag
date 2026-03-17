import Hero from '../components/Hero';
import UniversityFinder from '../components/UniversityFinder';

const Home = () => {
  return (
    <div>
      <Hero />
      <section className="py-16">
        <UniversityFinder />
      </section>
    </div>
  );
};

export default Home;
