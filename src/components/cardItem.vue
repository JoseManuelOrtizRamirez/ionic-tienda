<template>
    <ion-card>
        <img
            src="https://images.unsplash.com/photo-1613585810030-c2ae396ce0ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />
        <ion-card-header>
            <ion-card-title>Cheetos</ion-card-title>
            <ion-card-subtitle>$16.00</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <p class="description">Here's a small text description for the card content. Nothing more, nothing less.</p>
        </ion-card-content>
    </ion-card>
</template>
  
<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg } from '@ionic/vue';
import { defineComponent } from 'vue';
import './cardItem.css'

export default defineComponent({
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