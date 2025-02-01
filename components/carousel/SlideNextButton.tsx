"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwiper } from "swiper/react";


import { Button } from "../ui/button";

const SlideNextButton = ({rounded = false}) => {
  const swiper = useSwiper();
  return (
    <Button variant="outline" className={`${rounded && "rounded-full"}`} size="icon" onClick={() => swiper.slideNext()}>
      <ChevronLeft />
    </Button>
      
  );
};
const SlidePrevButton = ({rounded = false}) => {
  const swiper = useSwiper();

  return (
    <Button variant="outline" className={`${rounded && "rounded-full"}`} size="icon" onClick={() => swiper.slidePrev()}>
      <ChevronRight />
    </Button>
  );
};

export { SlideNextButton, SlidePrevButton };
