<template>
    <ion-page>
        <ion-content>
            <div class="form">
                <h4 class="form-link" @click="this.$router.push({ path: '/home' })">Regresar</h4>
                <h3 class="form-title">Registro</h3>
                <ion-input v-model="nuevoProducto.nombre" :clear-input="true" class="form-input" label="Nombre"
                    labelPlacement="stacked" placeholder="Escribir texto"></ion-input>
                <ion-input v-model="nuevoProducto.resumen" :clear-input="true" class="form-input" label="Resumen"
                    labelPlacement="stacked" placeholder="Escribir texto"></ion-input>
                <ion-input v-model="nuevoProducto.descripcion" :clear-input="true" class="form-input" label="Descripcion"
                    labelPlacement="stacked" placeholder="Escribir texto"></ion-input>
                <ion-input :clear-input="true" v-model="nuevoProducto.imagenArchivo" class="form-input" label="URL Imagen"
                    labelPlacement="stacked" placeholder="Insertar URL"></ion-input>
                <ion-input type="number" :clear-input="true" v-model="nuevoProducto.precio" class="form-input"
                    label="Precio $-mxn" labelPlacement="stacked" placeholder="Escribir precio"></ion-input>
                <ion-img class="form-img" :src="nuevoProducto.imagenArchivo" alt="Inserta URL para previsualizar"></ion-img>
                <ion-toggle class="form-toggle" v-model="selectCategory" aria-label="Success toggle" color="success"
                    labelPlacement="end">{{ selectCategory ? "Seleccionar" : "Crear" }}
                    categoria</ion-toggle>
                <ion-select v-if="selectCategory" interface="action-sheet"
                    @ionChange="nuevoProducto.categoria = $event.target.value" class="form-label-selector"
                    aria-label="Fruit" placeholder="Seleccionar categoria">
                    <ion-select-option v-for="categoria in categorias" :value="categoria">{{ categoria
                    }}</ion-select-option>
                </ion-select>
                <ion-input v-if="!selectCategory" :clear-input="true" v-model="nuevoProducto.categoria" class="form-input"
                    label="Nombre nueva categoria" labelPlacement="stacked" placeholder="Escribir texto"></ion-input>
                <ion-button @click="crearProducto" class="form-btn" color="tertiary" fill="outline">Guardar</ion-button>
            </div>
            <ion-grid class="guide">
                <h1 class="logo">TiendaServiciosApp</h1>
                <h3 class="guide-title">Creación de productos</h3>
                <h4 class="guide-description">Crea nuevos productos para la tienda, llena la información necesaria y haz
                    click en "guardar"</h4>
                <ion-alert :isOpen="alert.isAlertOpen" :header="alert.header" :subHeader="alert.subHeader"
                    :message="alert.message" :buttons="['Ok']" :didDismiss="setOpen(false)"></ion-alert>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
  
<script>
import { IonAlert, IonSelectOption, IonSelect, IonToggle, IonContent, IonModal, IonPage, IonTitle, IonGrid, IonRow, IonCol, IonButton, IonItem, IonLabel, IonInput, IonImg } from '@ionic/vue';
import axios from 'axios';

export default {
    components: {
        IonContent,
        IonPage,
        IonTitle,
        IonGrid,
        IonRow,
        IonCol,
        IonButton,
        IonItem,
        IonLabel,
        IonInput,
        IonImg,
        IonModal,
        IonToggle,
        IonSelect,
        IonSelectOption,
        IonAlert
    },
    data() {
        return {
            selectCategory: false,
            categorias: [],
            alert: {
                isAlertOpen: false,
                header: '',
                subHeader: '',
                message: ''
            },
            nuevoProducto: {
                nombre: '',
                categoria: '',
                resumen: '',
                descripcion: '',
                imagenArchivo: '',
                precio: '',
            },
        };
    },
    created() {
        this.obtenerProductos();
    },
    methods: {
        setOpen(isOpen) {
            this.alert.isAlertOpen = isOpen;
        },
        async obtenerProductos() {
            try {
                await fetch(`${import.meta.env.VITE_API}/Catalog`).then(res => res.json()).then(res => {
                    const categories = res.map(r => (r.categoria));
                    this.categorias = [...new Set(categories)];
                });
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        },
        async crearProducto() {
            console.log(this.nuevoProducto.categoria);
            if (this.nuevoProducto.categoria == "" || this.nuevoProducto.descripcion == "" || this.nuevoProducto.imagenArchivo == "" || this.nuevoProducto.nombre == "" || this.nuevoProducto.precio == "" || this.nuevoProducto.resumen == "") {
                return this.$swal.fire({
                    title: 'Error',
                    text: 'Todos los campos son necesarios para continuar',
                    icon: 'error',
                    heightAuto: false,
                    toast: true,
                    position: 'bottom-right',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            }

            if (this.nuevoProducto.precio <= 0) {
                return this.$swal.fire({
                    title: 'Error',
                    text: 'El precio debe ser mayor a 0',
                    icon: 'error',
                    heightAuto: false,
                    toast: true,
                    position: 'bottom-right',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            }

            this.nuevoProducto.precio = parseFloat(this.nuevoProducto.precio);
            try {
                await axios.post(`${import.meta.env.VITE_API}/Catalog`, this.nuevoProducto, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                this.nuevoProducto = {
                    nombre: '',
                    categoria: '',
                    resumen: '',
                    descripcion: '',
                    imagenArchivo: '',
                    precio: '',
                };

                this.$swal.fire({
                    title: 'Éxito',
                    text: 'Producto registrado con éxito',
                    icon: 'success',
                    heightAuto: false,
                    toast: true,
                    position: 'bottom-right',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                }).then(() => {
                    this.emitter.emit('create-event');
                    this.$router.push({ path: '/home' });
                });
            } catch (error) {
                console.error('Error al crear el producto:', error);
                this.$swal.fire({
                    title: 'Error',
                    text: 'Algo salió mal, no se guardaron los cambios',
                    icon: 'error',
                    heightAuto: false,
                    toast: true,
                    position: 'bottom-right',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            }
        },
    }
};
</script>

<style>
.guide {
    background-color: #2d2b4e;
    height: 100%;
    color: white;
}

.form {
    width: 65%;
    height: 100%;
    background-color: white;
    position: fixed;
    border-bottom-left-radius: 50px;
    border-top-left-radius: 50px;
    margin-left: 30rem;
    box-shadow: -5px 0px 10px -3px white;
    padding: 8rem;
}

.logo {
    margin-left: 1rem;
}

.guide-title {
    margin-top: 13rem;
    margin-left: 6rem;
    font-weight: bold;
}

.form-title {
    font-weight: bold;
}

.guide-description {
    margin-left: 1rem;
    width: 24rem;
    text-align: center;
}

.form-input {
    width: 20rem;
}

.form-img {
    object-fit: cover;
    width: 18rem;
    height: 10rem;
    margin-left: 25rem;
    margin-top: -14rem;
    border-style: solid;
    border-width: 1px;
    border-color: gainsboro;
    border-radius: 12px;
}

.form-toggle {
    margin-top: 5rem;
}

.form-label-selector {
    --placeholder-color: black;
    --placeholder-opacity: 1;
    width: 12rem;
    justify-content: center;
    --background: white;
    border-color: black;
    border-style: solid;
    border-width: 1px;
    border-color: gainsboro;
    border-radius: 12px;
}

.form-btn {
    margin-left: 35rem;
}

.form-link {
    margin-top: -3rem;
    margin-left: 38rem;
    position: fixed;
    font-size: 16px;
    cursor: pointer;
}
</style>