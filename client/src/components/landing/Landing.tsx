import LandingSliderItem from "./LandingSliderItem";

export interface SlideItemProps {
  img: string;
  alt: string;
  title: string;
  subtitle: string;
}

const slideItem: SlideItemProps[] = [
  {
    img: "https://res.cloudinary.com/dfgfylbvn/image/upload/v1713014343/Hand_with_money_vxfaoz.png",
    alt: "Home 1",
    title: "Gain total control of your money",
    subtitle: "Become your own money manager and make every cent count",
  },
  {
    img: "https://res.cloudinary.com/dfgfylbvn/image/upload/v1713822549/Paper_with_money_ycyfmd_c_crop_w_306_h_229_x_0_y_0_wiibzg.png",
    alt: "Home 2",
    title: "Know where you money goes",
    subtitle:
      "Track your trasaction easly with categories and financial report",
  },
  {
    img: "https://res.cloudinary.com/dfgfylbvn/image/upload/v1713014344/Task_clip_board_vbkiar.png",
    alt: "Home 3",
    title: "Planning ahead",
    subtitle: "Setup your budget for each category so you'r in control",
  },
];

const Landing = () => {
  return <LandingSliderItem slideItem={slideItem} />;
};

export default Landing;
