<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row class="menu-section">
          <div class="float-menu">
            <ion-row>
              <ion-col push-lg="0" class="menu-item">
                <p @click="this.$router.push({ path: '/home' })" class="menu-title">
                  TiendaServiciosApp
                </p>
              </ion-col>
              <ion-col size="auto" push-lg="3" class="menu-item">
                <font-awesome-icon @click="this.$router.push({ path: '/home' })" class="menu-icon"
                  :icon="['fas', 'house']" />Home
              </ion-col>
              <ion-col size="auto" push-lg="4" class="menu-item">
                <font-awesome-icon @click="this.$router.push({ path: '/create' })" class="menu-icon"
                  :icon="['fas', 'plus-circle']" /> Crear
              </ion-col>
              <ion-col size="auto" push-lg="5" class="menu-item">
                <ion-select interface="action-sheet" @ion-cancel="categoriasSeleccionadas = categorias"
                  @ionChange="filter($event.target.value)" class="menu-label-selector" aria-label="Fruit"
                  placeholder="Filtrar por categoria">
                  <ion-select-option v-for="categoria in categorias" :value="categoria">{{ categoria
                  }}</ion-select-option>
                </ion-select>
              </ion-col>
              <ion-col size="auto" push-lg="6" class="menu-item">
                <input v-model="nameFilter" class="menu-search-input" /><font-awesome-icon @click="filterByName"
                  class="menu-icon" :icon="['fas', 'search']" />
              </ion-col>
            </ion-row>
          </div>
        </ion-row>
        <ion-row class="content">
          <h3>Administración de productos</h3>
        </ion-row>
        <ion-row v-for="categoria, index in categoriasSeleccionadas" class="ion-margin-bottom">
          <card-carousel :products="productos.filter(p => p.categoria == categoria)" :handleDelete="handleDelete"
            :id="index" :category="categoria" />
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonSelect, IonSelectOption, IonModal, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonFooter, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonLabel, IonInput, IonImg, IonAlert, IonList, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/vue';
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
    CardCarousel,
    IonSelect,
    IonSelectOption
  },
  data() {
    return {
      productos: [],
      categorias: [],
      categoriasSeleccionadas: [],
      dialogoEliminar: false,
      dialogoCrear: false,
      productoParaBorrar: null,
      idSeleccionado: null,
      nameFilter: "",
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
  mounted() {
    this.emitter.on('create-event', () => {
      this.obtenerProductos();
    })
  },
  beforeDestroy() {
    eventBus.$off('create-event')
  },
  methods: {
    filter(value) {
      this.categoriasSeleccionadas = [value];
    },
    async obtenerProductos() {
      try {
        fetch(`${import.meta.env.VITE_API}/Catalog`).then(res => res.json()).then(res => {
          const categories = res.map(r => (r.categoria));
          this.categorias = [...new Set(categories)];
          this.categoriasSeleccionadas = this.categorias;
          this.productos = res;
        });
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    },
    async obtenerProductoPorId(id) {
      try {
        const respuesta = await axios.get(`${import.meta.env.VITE_API}/Catalog/${id}`, {
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
        const respuesta = await axios.get(`${import.meta.env.VITE_API}/Catalog/GetProductByCategory/${categoria}`, {
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
        await axios.put(`${import.meta.env.VITE_API}/Catalog`, producto, {
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
    handleDelete(id) {
      this.$swal.fire({
        title: 'Advertencia',
        text: '¿Deseas eliminar del stock al producto?',
        icon: 'warning',
        heightAuto: false,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#D44840'
      }).then(res => {
        if (res.isConfirmed)
          this.borrarProducto(id);
      });

    },
    async borrarProducto(id) {
      try {
        await axios.delete(`${import.meta.env.VITE_API}/Catalog/${id}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        this.productos = this.productos.filter(p => p.id != id);

        this.$swal.fire({
          title: 'Éxito',
          text: 'El producto ha sido eliminado',
          icon: 'success',
          heightAuto: false,
          toast: true,
          position: 'bottom-right',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
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
    async filterByName() {
      try {
        const respuesta = await axios.get(`${import.meta.env.VITE_API}/Catalog/ByName/${this.nameFilter}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        if (respuesta.data.length > 0) {
          this.productos = respuesta.data;
          this.categoriasSeleccionadas = [respuesta.data[0].categoria];
        } else {
          this.$swal.fire({
            title: 'Error',
            text: 'Producto no encontrado',
            icon: 'warning',
            heightAuto: false,
            toast: true,
            position: 'bottom-right',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
          });
        }
      } catch (error) {
        console.error('Error al obtener el producto por nombre:', error);
        this.$swal.fire({
          title: 'Error',
          text: 'Algo salió mal',
          icon: 'error',
          heightAuto: false,
          toast: true,
          position: 'bottom-right',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
    }
  }
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

body,
html {
  background-color: #ebebeb;
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

.float-menu {
  position: fixed;
  top: 20px;
  margin-left: 15px;
  background-color: #2d2b4e;
  border: 1px solid #2d2b4e;
  padding: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 95%;
  border-radius: 30px;
  height: 4rem;
  display: flex;
  z-index: 5;
}

.menu-title {
  color: white;
  margin-left: 1rem;
  font-size: 20px;
  align-self: flex-start;
}

.menu-icon {
  color: white;
  font-size: 20px;
  margin-top: 1rem;
  margin-right: 5px;
}

.menu-section {
  height: 5rem;
}

.menu-item {
  color: white;
  margin-top: -5px;
  --ion-grid-column-padding: 5px;
  margin-left: 0.3rem;
  cursor: pointer;
}

.menu-search-input {
  background: transparent;
  border-style: solid;
  border-color: white;
  border-width: 2px;
  border-radius: 12px;
  margin-right: 10px;
}

.menu-label-selector {
  --placeholder-color: white;
  --placeholder-opacity: 1;
  width: 10rem;
  justify-content: center;
  --background: #2d2b4e;
  margin-top: -2px;
}

.content {
  margin-left: 18px;
}
</style>