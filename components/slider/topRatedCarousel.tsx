'use client'
import { Swiper, SwiperSlide } from "swiper/react";

import { convertDocToObj } from "@/lib/utils";

import "swiper/css";
import { SlideNextButton, SlidePrevButton } from "../carousel/SlideNextButton";
import ProductItem from "../products/ProductItem";


const TopRatedCarousel = ({ topRated }: any) => {
    return (
        <Swiper slidesPerView={2}
            spaceBetween={16}
            breakpoints={{
                640: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 16,
                },
                1280: {
                    slidesPerView: 7,
                    spaceBetween: 16,
                },
            }}>
            <div className="absolute top-1/2 right-0 z-10">
                <SlidePrevButton rounded />
            </div>
            <div className="absolute top-1/2 left-0 z-10">
                <SlideNextButton rounded />
            </div>
            {topRated.map((product: any) => (
                <SwiperSlide key={product.slug} className='sm:basis-1/2 md:basis-1/3 lg:basis-1/4'>
                    <ProductItem product={convertDocToObj(product)} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default TopRatedCarousel