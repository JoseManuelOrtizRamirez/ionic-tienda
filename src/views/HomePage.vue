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
          <ion-col>
            <ion-item>
              <ion-label position="floating">Categorías</ion-label>
              <ion-input v-model="categoriaSeleccionada"></ion-input>
            </ion-item>
            <ion-button class="ion-margin-top" @click="obtenerProductosPorCategoria(categoriaSeleccionada)">
              Buscar
            </ion-button>
            <ion-button class="ion-margin-top" color="success" @click="dialogoCrear = true">Insertar</ion-button>
            <ion-item>
              <ion-label position="floating">Buscar por ID</ion-label>
              <ion-input v-model="idSeleccionado"></ion-input>
            </ion-item>
            <ion-button class="ion-margin-top" @click="obtenerProductoPorId(idSeleccionado)">Buscar</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" size-sm="6" size-md="4" size-lg="3" v-for="producto in productos" :key="producto.id">
            <ion-card>
              <ion-img :src="producto.imagenArchivo" />
              <ion-card-header>
                <ion-card-title>{{ producto.id }}</ion-card-title>
                <ion-card-subtitle>{{ producto.nombre }}</ion-card-subtitle>
                <ion-card-subtitle>{{ producto.categoria }}</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <ion-button color="danger" @click="prepararEliminar(producto)">Eliminar</ion-button>
                <ion-button color="primary" @click="prepararActualizar(producto)">Actualizar</ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>



      </ion-grid>
      <!-- Modal for viewing product by ID -->
      <ion-modal :is-open="dialogoBuscarPorID" @ionModalDidDismiss="dialogoBuscarPorID = false">
        <ion-card>
          <!-- Add product data here -->
          <ion-card-header>
            <ion-card-title>{{ productoBuscadoPorID.id }}</ion-card-title>
            <ion-card-subtitle>{{ productoBuscadoPorID.nombre }}</ion-card-subtitle>
            <ion-card-subtitle>{{ productoBuscadoPorID.categoria }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <!-- You can include more detailed info here, if available -->
          </ion-card-content>
          <ion-button color="primary" @click="dialogoBuscarPorID = false">Cerrar</ion-button>
        </ion-card>
      </ion-modal>

      <!-- Modal for viewing products by category -->
      <ion-modal :is-open="dialogoBuscarPorCategoria" @ionModalDidDismiss="dialogoBuscarPorCategoria = false">
        <ion-grid>
          <ion-row>
            <ion-col>Id</ion-col>
            <ion-col>Nombre</ion-col>
            <ion-col>Categoria</ion-col>
            <!-- Add more columns if needed -->
          </ion-row>
          <ion-row v-for="producto in productosBuscadosPorCategoria" :key="producto.id">
            <ion-col>{{ producto.id }}</ion-col>
            <ion-col>{{ producto.nombre }}</ion-col>
            <ion-col>{{ producto.categoria }}</ion-col>
            <!-- Add more columns if needed -->
          </ion-row>
        </ion-grid>
        <ion-button color="primary" @click="dialogoBuscarPorCategoria = false">Cerrar</ion-button>
      </ion-modal>

      <!-- Modal for updating a product -->

      <!-- Modal for updating a product -->
      <ion-modal :is-open="dialogoActualizar" @ionModalDidDismiss="dialogoActualizar = false">
        <ion-header>
          <ion-toolbar>
            <ion-title color>Actualizar Producto</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-list>
            <ion-item>
              <ion-label position="floating">ID</ion-label>
              <ion-input type="text" v-model="productoParaActualizar.id" readonly></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Nombre</ion-label>
              <ion-input type="text" v-model="productoParaActualizar.nombre"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Categoría</ion-label>
              <ion-input type="text" v-model="productoParaActualizar.categoria"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Resumen</ion-label>
              <ion-input type="text" v-model="productoParaActualizar.resumen"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Descripción</ion-label>
              <ion-input type="text" v-model="productoParaActualizar.descripcion"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Imagen</ion-label>
              <ion-input type="text" v-model="productoParaActualizar.imagenArchivo"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Precio</ion-label>
              <ion-input type="text" v-model="productoParaActualizar.precio"></ion-input>
            </ion-item>
          </ion-list>

          <ion-button expand="full" color="primary"
            @click="actualizarProducto(productoParaActualizar)">Actualizar</ion-button>
          <ion-button expand="full" color="light" @click="dialogoActualizar = false">Cerrar</ion-button>
        </ion-content>
      </ion-modal>
      <!-- Modal for creating a product -->
      <ion-modal :is-open="dialogoCrear" @ionModalDidDismiss="dialogoCrear = false">
        <ion-header>
          <ion-toolbar>
            <ion-title>Crear Producto</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-list>
            <ion-item>
              <ion-label position="floating">Nombre</ion-label>
              <ion-input type="text" v-model="nuevoProducto.nombre"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Categoría</ion-label>
              <ion-input type="text" v-model="nuevoProducto.categoria"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Resumen</ion-label>
              <ion-input type="text" v-model="nuevoProducto.resumen"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Descripción</ion-label>
              <ion-input type="text" v-model="nuevoProducto.descripcion"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Imagen</ion-label>
              <ion-input type="text" v-model="nuevoProducto.imagenArchivo"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Precio</ion-label>
              <ion-input type="text" v-model="nuevoProducto.precio"></ion-input>
            </ion-item>
          </ion-list>

          <ion-button expand="full" color="success" @click="crearProducto">Crear</ion-button>
          <ion-button expand="full" color="light" @click="dialogoCrear = false">Cerrar</ion-button>
        </ion-content>
      </ion-modal>

      <!-- Modal for deleting a product -->
      <ion-modal :is-open="dialogoEliminar" @ionModalDidDismiss="dialogoEliminar = false">

        <ion-button color="danger" @click="borrarProducto">Eliminar</ion-button>
        <ion-button color="primary" @click="dialogoEliminar = false">Cerrar</ion-button>
      </ion-modal>
      <ion-footer>
        <ion-toolbar color="primary">
          <ion-title class="ion-text-center">Footer Content</ion-title>
        </ion-toolbar>
      </ion-footer>
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