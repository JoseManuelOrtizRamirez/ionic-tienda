<template>
    <swiper slides-per-view="2" space-between="1" class="swiper">
        <swiper-slide><card-item /></swiper-slide>
        <swiper-slide><card-item /></swiper-slide>
        <swiper-slide><card-item /></swiper-slide>
        <swiper-slide><card-item /></swiper-slide>
        <swiper-slide><card-item /></swiper-slide>
    </swiper>
</template>
  
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { defineComponent } from 'vue';
import CardItem from './cardItem.vue';
import "./cardCarousel.css";
import 'swiper/css';

export default defineComponent({
    components: {
        Swiper,
        SwiperSlide,
        CardItem
    },
    name: 'CardCarousel',
    setup() {
        // Optional parameters to pass to the swiper instance. See https://swiperjs.com/swiper-api for valid options.
        const slideOpts = {
            initialSlide: 1,
            speed: 400,
        };
        return { slideOpts };
    },
});
</script>