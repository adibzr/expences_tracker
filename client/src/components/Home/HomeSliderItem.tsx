import { useState } from "react";
import { SlideItemProps } from "./Home";
import style from "./slider.module.css";

interface sliderPorps {
  slideItem: SlideItemProps[];
}

const HomeSlideItem: React.FC<sliderPorps> = ({ slideItem }) => {
  const [imageIndex] = useState(0);

  return (
    <div className={style.wrapper}>
      {slideItem.map((item) => {
        return (
          <div
            className={style.sliderItem}
            style={{ translate: `${-100 * imageIndex}%` }}
          >
            <div>
              <img src={item.img} alt={item.alt} />
            </div>
            <h2>{item.title}</h2>
            <h3>{item.subtitle}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default HomeSlideItem;
