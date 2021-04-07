import { memo } from "react";
import Swiper from "swiper";
import loading from "@/assets/images/lazy.webp";
import { useMount } from "@/hooks";

const Banner = () => {
  useMount(() => {
    let swiper: Swiper | null = new Swiper(".swiper-container", {
      loop: true,
      autoplay: {
        delay: 1000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });
    return () => {
      swiper = null;
    };
  });

  return (
    <div>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <img
              src={loading}
              alt="banner"
              style={{ width: "100%", height: "200px" }}
            />
          </div>
          <div className="swiper-slide">
            <img
              src={loading}
              alt="banner"
              style={{ width: "100%", height: "200px" }}
            />
          </div>
          <div className="swiper-slide">
            <img
              src={loading}
              alt="banner"
              style={{ width: "100%", height: "200px" }}
            />
          </div>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};

export default memo(Banner);
