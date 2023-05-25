<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Administrar Productos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row class="ion-margin-bottom">
          <card-carousel />
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonModal, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonFooter, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonLabel, IonInput, IonImg, IonAlert, IonList, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/vue';
import axios from 'axios';
import CardCarousel from '../components/cardCarousel.vue';

export default {
  components: {
    IonContent,
    IonFooter,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonImg,
    IonAlert,
    IonList,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonModal,
    CardCarousel
  },
  data() {
    return {
      productos: [],
      dialogoEliminar: false,
      dialogoCrear: false,
      productoParaBorrar: null,
      idSeleccionado: null,
      nuevoProducto: {
        nombre: '',
        categoria: '',
        resumen: '',
        descripcion: '',
        imagenArchivo: '',
        precio: '',
      },
      dialogoActualizar: false,
      productoParaActualizar: {
        id: '',
        nombre: '',
        categoria: '',
        resumen: '',
        descripcion: '',
        imagenArchivo: '',
        precio: '',
      },
      dialogoBuscarPorID: false,
      productoBuscadoPorID: {},
      dialogoBuscarPorCategoria: false,
      productosBuscadosPorCategoria: [],
      categoriaSeleccionada: null,
    };
  },
  created() {
    this.obtenerProductos();
  },
  methods: {
    async obtenerProductos() {
      try {
        const respuesta = await axios.get('https://localhost:44308/api/Catalog', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        this.productos = respuesta.data;
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    },
    async obtenerProductoPorId(id) {
      try {
        const respuesta = await axios.get(`https://localhost:44308/api/Catalog/${id}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        this.productoBuscadoPorID = respuesta.data;
        this.dialogoBuscarPorID = true;
      } catch (error) {
        console.error('Error al obtener el producto por ID:', error);
      }
    },
    async obtenerProductosPorCategoria(categoria) {
      try {
        const respuesta = await axios.get(`https://localhost:44308/api/Catalog/GetProductByCategory/${categoria}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        this.productosBuscadosPorCategoria = respuesta.data;
        this.dialogoBuscarPorCategoria = true;
      } catch (error) {
        console.error('Error al obtener los productos por categoría:', error);
      }
    },
    async actualizarProducto(producto) {
      try {
        await axios.put('https://localhost:44308/api/Catalog', producto, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        this.dialogoActualizar = false;
        this.obtenerProductos();
      } catch (error) {
        console.error('Error al actualizar el producto:', error);
      }
    },
    prepararEliminar(producto) {
      this.productoParaBorrar = producto;
      this.dialogoEliminar = true;
    },
    prepararActualizar(producto) {
      this.productoParaActualizar = { ...producto };
      this.dialogoActualizar = true;
    },
    async borrarProducto() {
      try {
        if (this.productoParaBorrar) {
          await axios.delete(`https://localhost:44308/api/Catalog/${this.productoParaBorrar.id}`, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
          this.productoParaBorrar = null;
          this.obtenerProductos();
          this.dialogoEliminar = false;
        }
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    },
    async crearProducto() {
      try {
        await axios.post('https://localhost:44308/api/Catalog', this.nuevoProducto, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        this.dialogoCrear = false;
        this.obtenerProductos();
        this.nuevoProducto = {
          nombre: '',
          categoria: '',
          resumen: '',
          descripcion: '',
          imagenArchivo: '',
          precio: '',
        };
      } catch (error) {
        console.error('Error al crear el producto:', error);
      }
    },
  },
};
</script>

<style scoped>
.ion-margin-top {
  margin-top: 1rem;
}

.ion-margin-bottom {
  margin-bottom: 1rem;
}

.ion-text-center {
  text-align: center;
}

.ion-color-secondary {
  --ion-color-base: var(--ion-color-secondary);
}

.ion-color-success {
  --ion-color-base: var(--ion-color-success);
}

.ion-color-danger {
  --ion-color-base: var(--ion-color-danger);
}

.ion-color-primary {
  --ion-color-base: var(--ion-color-primary);
}

/* New styles for transitions, hover effects, and minimalism */
.ion-card {
  transition: all 0.5s ease;
  border-radius: 15px;
  overflow: hidden;
  border: none;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
}

.ion-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.15);
}

.ion-button {
  border-radius: 15px;
  transition: all 0.5s ease;
}

.ion-button:hover {
  transform: translateY(-3px);
}

.ion-color-primary {
  --ion-color-base: #4caf50;
}

.ion-color-primary-shade {
  --ion-color-base-shade: #388e3c;
}

.ion-toolbar {
  --background: #4caf50;
}

.ion-title {
  --color: #ffffff;
}
</style>