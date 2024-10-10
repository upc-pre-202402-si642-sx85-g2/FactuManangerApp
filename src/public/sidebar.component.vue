<script>
export default {
  name:'sidebar'
}
</script>

<template>

  <div class="sidebar">
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
            <router-link to="/home">
              <i class="pi pi-book" style="font-size: 1.8rem"></i>
              Cartera
            </router-link>
          </div>
        </li>
        <li>
          <div class="option">
            <router-link to="/home">
              <i class="pi pi-database" style="font-size: 1.8rem"></i>
              Operaciones
            </router-link>
          </div>
        </li>
        <li>
          <div class="option">
            <router-link to="/home">
              <i class="pi pi-cog" style="font-size: 1.8rem"></i>
              Registro
            </router-link>
          </div>
        </li>
        <li>
          <div class="option">
            <router-link to="/home">
              <i class="pi pi-sign-out" style="font-size: 1.8rem"></i>
              Salir
            </router-link>
          </div>
        </li>
      </ul>
    </div>

  </div>

</template>

<style>
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
  filter: drop-shadow(0 0 4px rgba(0,0,0,0.5));
  height: 100vh;
  padding: 50px;
  position: fixed;
  width: 320px;
}

.logo img {
  margin-bottom: 50px;
  width: 220px;
}

.navigation {
  overflow-y: auto;
  width: 250px;
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
</style>