import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

const Home = () => {
  const [ref] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="style.carousel" ref={ref}>
      <div className="style.wrapper"></div>
    </div>
  );
};

export default Home;
