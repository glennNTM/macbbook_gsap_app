import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import ProductViewer from "./components/ProductViewer";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { gsap } from "gsap";
import Showcase from "./components/Showcase";
import Footer from "./components/Footer";
import Performance from "./components/Performance";
import Features from "./components/Features";
import Highlights from "./components/Highlights";



gsap.registerPlugin(ScrollTrigger);
 
const App = () => {
  return (
    <main>
      <NavBar />
      <Hero />
      <ProductViewer />
      <Showcase />
      <Performance />
      <Features />
      <Highlights />
      <Footer />
    </main>
  );
};

export default App;
