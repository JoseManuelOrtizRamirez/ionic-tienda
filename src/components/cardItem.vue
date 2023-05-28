<template>
    <ion-card class="card">
        <font-awesome-icon @click="handleDelete(product.id)" class="card-icon" :icon="['fa', 'trash']" />
        <img :src="product.imagenArchivo" />
        <ion-card-header class="card-header">
            <ion-card-title class="card-title">{{ product.nombre }}</ion-card-title>
            <ion-card-subtitle class="card-subtitle">${{ product.precio }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content class="card-content">
            <p class="description">{{ product.descripcion }}</p>
        </ion-card-content>
    </ion-card>
</template>
  
<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg } from '@ionic/vue';
import { defineComponent } from 'vue';
import './cardItem.css'

export default defineComponent({
    props: ['product', 'handleDelete'],
    name: 'CardItem',
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg },
});
</script>
  
<style scoped>
/* iOS places the subtitle above the title */
ion-card-header.ios {
    display: flex;
    flex-flow: column-reverse;
}
</style>