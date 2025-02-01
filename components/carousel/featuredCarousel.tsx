'use client'
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { SlideNextButton, SlidePrevButton } from "./SlideNextButton";

const FeaturedCarousel = ({featuredProducts} : any) => {
  return (
    <Swiper className="group">
      <div className="flex items-center gap-2 absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <SlidePrevButton />
          <SlideNextButton />
        </div>
        {featuredProducts.map((product : any) => (
        <SwiperSlide key={product.slug}>
          <div className='w-full overflow-hidden rounded-lg'>
            <Link href={`/product/${product.slug}`}>

              <Image
                src={product.banner!}
                className='h-[200px] w-full object-cover lg:h-[400px]'
                width={1500}
                height={300}
                alt={product.name}
                blurDataURL={product.banner!}
                placeholder='blur'
                sizes='(max-width: 1500px) 100vw, 1500px'
                priority
              />
            </Link>
          </div>
        </SwiperSlide>
      ))}
      </Swiper>
  )
}

export default FeaturedCarousel