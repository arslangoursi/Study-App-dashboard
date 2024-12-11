"use client";

import "@/styles/slidingImages.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

import SlidingImagesEntry from "./SlidingImagesEntry";

const settings = {
  sliders: [
    {
      image: "/assets/Lieviayard.webp",
      link: "https://www.instagram.com/p/CS3w2Q1JW9y/",
      color: "#9D6323"
    },
    {
      image: "/assets/alnakheel.webp",
      link: "https://www.instagram.com/p/CS3w2Q1JW9y/",
      color: "#FFB73C"
    },
    {
      image: "/assets/alna.webp",
      link: "https://www.instagram.com/p/CS3w2Q1JW9y/",
      color: "#FFD700"
    },
    {
      image: "/assets/resort.webp",
      link: "https://www.instagram.com/p/CS3w2Q1JW9y/",
      color: "#98540A"
    },
    {
      image: "/assets/opal.webp",
      link: "https://www.instagram.com/p/CS3w2Q1JW9y/",
      color: "#9D6323"
    },
    {
      image: "/assets/northimg.webp",
      link: "https://www.instagram.com/p/CS3w2Q1JW9y/",
      color: "#FFB73C"
    },
    {
      image: "/assets/zoodslider.webp",
      link: "https://www.instagram.com/p/CS3w2Q1JW9y/",
      color: "#98540A"
    },
    {
      image: "/assets/infoswip9.webp",
      link: "https://www.instagram.com/p/CS3w2Q1JW9y/",
      color: "#9D6323"
    },
    {
      image: "/assets/infoswip10.webp",
      link: "https://www.instagram.com/p/CS3w2Q1JW9y/",
      color: "#FFB73C"
    },
    {
      image: "/assets/infosw2.webp",
      link: "https://www.instagram.com/p/CS3w2Q1JW9y/",
      color: "#000"
    }
  ]
};

function SlidingImages() {
  const slides = settings?.sliders || [];

  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="slidingImages">
        <motion.div
          data-aos="fade-up"
          style={{ x: x1 }}
          // @ts-ignore
          className="slider"
        >
          <Swiper
            slidesPerView={
              isClient && window.innerWidth > 786 ? slides.length / 2 : 1
            }
            spaceBetween={30}
          >
            {slides?.slice(0, slides.length / 2)?.map((project, index) => (
              <SwiperSlide key={index}>
                <SlidingImagesEntry project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        <motion.div
          data-aos="fade-up"
          style={{ x: x2 }}
          // @ts-ignore
          className="slider"
        >
          <Swiper
            slidesPerView={
              isClient && window.innerWidth > 786 ? slides.length / 2 : 1
            }
            spaceBetween={30}
          >
            {slides
              ?.slice(slides.length / 2, slides.length)
              ?.map((project, index) => (
                <SwiperSlide key={index}>
                  <SlidingImagesEntry project={project} />
                </SwiperSlide>
              ))}
          </Swiper>
        </motion.div>
        <motion.div
          style={{ height }}
          // @ts-ignore
          className="circleContainer"
        >
          <div className="circle" />
        </motion.div>
      </div>
    </>
  );
}

export default SlidingImages;
