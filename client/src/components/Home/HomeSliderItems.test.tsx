import { render, screen } from "@testing-library/react";
import HomeSliderItem from "./HomeSliderItem";
import { slideItem } from "./Home";

test("renders HomeSlideItem component", () => {
  render(<HomeSlideItem slideItem={slideItem} />);
  const imgElement = screen.getByAltText("Home 1");
  expect(imgElement).toBeDefined();
});
