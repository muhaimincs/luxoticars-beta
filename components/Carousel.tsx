import * as React from 'react'
import { SwiperOptions } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {
  EffectFade,
  Autoplay
} from 'swiper'
// import Image from 'next/image'
import { useDimensions } from 'react-hook-dimensions'

import 'swiper/css/navigation'
import 'swiper/css/pagination'

SwiperCore.use([EffectFade, Autoplay])

type CarouselProps = {
  children: React.ReactNode
  className: string
}

const Carousel: React.FC<CarouselProps> = ({ children, className }) => {
  const [elementRef, elementDimensions, updateElementDimensions] = useDimensions({
    dependencies: [],
    defaults: {
      height: 300,
      scrollY: 100
    },
    layoutEffect: true
  })

  const swiperParams: SwiperOptions = {
    slidesPerView: 1,
    // spaceBetween: 50,
    centeredSlides: true,
    width: elementDimensions.width,
    height: elementDimensions.height,
  }

  React.useEffect(() => {
    updateElementDimensions()
  }, [updateElementDimensions])

  return (
    <div className={className} ref={elementRef as React.RefObject<HTMLDivElement>}>
      <Swiper
        effect={'fade'}
        {...swiperParams}
        className='fixed w-full h-screen left-0 z-0 top-0'
      >
        <SwiperSlide>
          <div className='w-full h-full relative overflow-hidden'>
            <button type="button" className='absolute bottom-[2em] left-[2em] z-[101] cursor-pointer block text-white opacity-50'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={`https://res.cloudinary.com/dkgbrdmj4/image/upload/c_crop,g_face,w_${elementDimensions.width}/v1635906737/LUXOTICARS/bafybeid7kualxhp3emamgkk2xbf2djyadbkl4u2onlcskmsudeucousm5m_m2ug9j.webp`}
              data-object-fit="cover"
              width={elementDimensions.width}
              height={elementDimensions.height}
              className="object-cover h-screen"
            >
              {/* <source
                src={`https://res.cloudinary.com/dkgbrdmj4/video/upload/ac_none,c_fit,e_deshake:16,h_${elementDimensions.height},q_70/g_north,c_scale,l_LUXOTICARS:watermark,w_180,y_180/v1635907269/LUXOTICARS/bafybeidvysen4oi7su3owebwge5aof7b6ljemtmsyuzbytowdkh5kkpova_k2ud3d.webm`}
                type="video/webm"
              /> */}
              <source
                src={'https://videos.ctfassets.net/ijuxqf6x1pz2/6RNqbc4oicSrprnxiE8wHT/f31513c52d46b75e0a1aa83517bf3951/montage.mp4'}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black z-50" aria-hidden="true" />
          </div>
        </SwiperSlide>
      </Swiper>
      {children}
    </div>
  )
}

export default Carousel
