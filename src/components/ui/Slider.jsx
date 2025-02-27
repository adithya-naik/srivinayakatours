import React,{ useEffect } from 'react';
import Slick from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { twMerge } from 'tailwind-merge';

const Slider = ({
  children,
  dots = true,
  arrows = true,
  infinite = true,
  speed = 500,
  slidesToShow = 1,
  slidesToScroll = 1,
  autoplay = false,
  autoplaySpeed = 3000,
  responsive,
  className,
  ...props
}) => {
  useEffect(() => {
    // Trigger window resize event after component mounts
    // This helps Slick recalculate dimensions
    window.dispatchEvent(new Event('resize'));
  }, []);

  const settings = {
    dots,
    arrows,
    infinite,
    speed,
    slidesToShow,
    slidesToScroll,
    autoplay,
    autoplaySpeed,
    responsive,
    ...props,
  };

  return (
    <div className={twMerge('slider-container', className)}>
      <Slick {...settings}>{children}</Slick>
    </div>
  );
};

export default Slider;