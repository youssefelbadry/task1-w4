import Arrival from "./Arrival";
import "./home.css";
import BestSelling from "./BestSelling";
import Sales from "./Sales";
import Hero from "./hero";
import BrowserCatogery from "./BrowserCatogery";
import ExploreProduct from "./EsploreProduct";

const Home = () => {
  return (
    <div className="container">
      <Hero className="mt-5" />
      <hr />
      <Sales />
      <hr />
      <BrowserCatogery />
      <hr />
      <BestSelling />
      <hr />
      <ExploreProduct />
      <hr />
      <Arrival />
    </div>
  );
};

export default Home;
