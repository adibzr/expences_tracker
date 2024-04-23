import { useCallback, useEffect, useRef, useState } from "react";
import { SlideItemProps } from "./Home";
import style from "./slider.module.css";

interface sliderPorps {
  slideItem: SlideItemProps[];
}

const HomeSlideItem: React.FC<sliderPorps> = ({ slideItem }) => {
  const timerRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    const lastSlide = currentIndex === slideItem.length - 1;
    const newIndex = lastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slideItem]);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      next();
    }, 3000);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [next]);

  return (
    <div className={style.wrapper}>
      {slideItem.map((item) => {
        return (
          <div
            className={style.sliderItem}
            style={{ translate: `${-100 * currentIndex}%` }}
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
