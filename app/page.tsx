import Header from './components/Header';
import Hero from './components/Hero';
import PopularDestinations from './components/PopularDestinations';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <PopularDestinations />
    </div>
  );
}
