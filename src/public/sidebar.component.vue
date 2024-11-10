<script>
export default {
  name: 'sidebar',
  data() {
    return {
      isSidebarVisible: false,
      windowWidth: window.innerWidth // ancho de la ventana
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateWindowWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateWindowWidth);
  }
};
</script>

<template>
  <div>

    <button class="toggle-button" @click="toggleSidebar" v-if="windowWidth <= 1500 && !isSidebarVisible">
      <i class="pi pi-bars" style="font-size: 2rem"></i>
    </button>

    <div class="sidebar" v-if="(windowWidth <= 1500 && isSidebarVisible) || windowWidth > 1500">
      <div class="logo">
        <img src="/src/assets/logo.svg" alt="FactuManager's logo">
      </div>
      <div class="navigation">
        <ul>
          <li>
            <div class="option">
              <router-link to="/home">
                <i class="pi pi-home" style="font-size: 1.8rem"></i>
                Inicio
              </router-link>
            </div>
          </li>
          <li>
            <div class="option">
              <router-link to="/portfolio">
                <i class="pi pi-book" style="font-size: 1.8rem"></i>
                Cartera
              </router-link>
            </div>
          </li>
          <li>
            <div class="option">
              <router-link to="/operations">
                <i class="pi pi-database" style="font-size: 1.8rem"></i>
                Operaciones
              </router-link>
            </div>
          </li>
          <li>
            <div class="option">
              <router-link to="/letter-registry">
                <i class="pi pi-cog" style="font-size: 1.8rem"></i>
                Registro
              </router-link>
            </div>
          </li>
          <li>
            <div class="option">
              <router-link to="/login">
                <i class="pi pi-sign-out" style="font-size: 1.8rem"></i>
                Salir
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <button class="toggle-button" @click="toggleSidebar" v-if="windowWidth <= 1300 && isSidebarVisible">
      <i class="pi pi-times" style="font-size: 2rem"></i>
    </button>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.sidebar {
  background-color: #4A79F7;
  border-radius: 0 15px 15px 0;
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.5));
  height: 100vh;
  padding: 50px;
  position: fixed;
  width: 320px;
  transition: width 0.3s ease-in-out;
  z-index: 1000;
}

.logo img {
  margin-bottom: 50px;
  width: 220px;
}

.navigation {
  overflow-y: auto;
  width: 100%;
}

.navigation li {
  list-style: none;
}

.option {
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 45px;
  margin-bottom: 40px;
  width: 100%;
}

.option a {
  color: #e1effd;
  font-family: 'Lato', sans-serif;
  font-size: 1.5rem;
  text-decoration: none;
}

.option i {
  margin-right: 20px;
}

.toggle-button {
  background-color: #4A79F7;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  display: none;
  margin: 10px;
  padding: 10px;
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
}


@media (max-width: 1500px) {
  .toggle-button {
    display: block;
  }

  .sidebar {
    display: block;
  }

  .sidebar {
    left: 0;
    right: 0;
  }
}


@media (min-width: 1501px) {
  .sidebar {
    display: block;
    width: 320px;
  }
}
</style>