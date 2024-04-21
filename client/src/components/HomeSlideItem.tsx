import { useState } from "react";
import { SlideItemProps } from "./Home";
import { CircleDot, Circle } from "lucide-react";
import style from "./slider.module.css";

interface sliderPorps {
  slideItem: SlideItemProps[];
}

const HomeSlideItem: React.FC<sliderPorps> = ({ slideItem }) => {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div
      aria-label="Image Slider"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {slideItem.map((item, index) => {
        return (
          <div>
            <img
              key={item.alt}
              src={item.img}
              alt={item.alt}
              aria-hidden={imageIndex !== index}
              className={style.sliderItem}
              style={{ translate: `${-100 * imageIndex}%` }}
            />
            <h2>{item.title}</h2>
            <h3>{item.subtitle}</h3>
            <div className={style.sliderDotContainer}>
              {slideItem.map((_, index) => (
                <button
                  key={index}
                  className={style.sliderDotBtn}
                  aria-label={`View Image ${index + 1}`}
                  onClick={() => setImageIndex(index)}
                >
                  {index === imageIndex ? (
                    <CircleDot aria-hidden />
                  ) : (
                    <Circle aria-hidden />
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeSlideItem;
