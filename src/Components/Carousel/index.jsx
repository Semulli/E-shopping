import React from "react";
import {Box} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Navigation, Pagination, Autoplay} from "swiper/modules";

const images = [
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?fm=jpg&q=60&w=3000",
    "https://plus.unsplash.com/premium_photo-1661769021743-7139c6fc4ab9?fm=jpg&q=60&w=3000",
    "https://static.vecteezy.com/system/resources/thumbnails/023/779/291/small_2x/ai-generated-ai-generative-realistic-illustration-of-different-skin-body-care-products-beauty-healthy-luxury-lifestyle-graphic-art-photo.jpg",
];

export default function MainCarousel() {
    return (
        <Box
            sx={{
                maxWidth: "100%",
                height: "600px",
                margin: "auto",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: 3,
            }}
        >
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                loop
                pagination={{clickable: true}}
                navigation
                autoplay={{delay: 5000}}
            >
                {images.map((image, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <img
                                src={image}
                                alt={`slide-${index}`}
                                style={{
                                    width: "100%",
                                    height: "600px",
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                }}
                            />
                        </SwiperSlide>
                    )
                })}

            </Swiper>
        </Box>
    );
}
