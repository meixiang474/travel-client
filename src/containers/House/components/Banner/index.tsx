import { memo } from "react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import loading from "@/assets/images/lazy.webp";
import { useImg } from "@/hooks";

interface BannerProps {
  images: string[];
}

SwiperCore.use([Pagination, Autoplay]);

const Banner = (props: BannerProps) => {
  const { images = [] } = props;

  useImg(".img", { loading, error: loading }, [images]);

  return (
    <Swiper
      className="swiper"
      loop
      autoplay={{
        delay: 1500,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
    >
      {images.length === 0 && (
        <SwiperSlide>
          <img src={loading} />
        </SwiperSlide>
      )}
      {images.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <img data-src={item} src={loading} alt="banner" className="img" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default memo(Banner);
