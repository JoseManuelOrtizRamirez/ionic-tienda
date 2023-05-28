<template>
    <div :class="`swiper-container swiper${id}`">
        <h1 class="category-name">{{ category }}</h1>
        <swiper style="padding-top: 3rem;" :slides-per-view="numberOfCards" space-between="1">
            <swiper-slide v-for="product in products"><card-item :handleDelete="handleDelete"
                    :product="product" /></swiper-slide>
        </swiper>
    </div>
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
    props: ['products', 'category', 'id', 'handleDelete'],
    data() {
        return {
            numberOfCards: 4
        }
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
    mounted() {
        //this.obtenerProductos();
        this.checkIfMobileVersion();
    },
    methods: {
        async obtenerProductos() {
            try {
                await fetch(`${import.meta.env.VITE_API}/Catalog/bycategory/${this.category}`).then(res => res.json()).then(res => {
                    console.log(res);
                    this.products = res;
                });
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        },
        checkIfMobileVersion() {
            if (/Android|iPhone/i.test(navigator.userAgent)) {
                this.numberOfCards = 2;
            }
        }
    }
});
</script>