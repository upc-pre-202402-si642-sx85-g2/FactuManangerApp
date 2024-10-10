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
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.logo img{
  margin-bottom: 50px;
  width: 220px;
}

.option{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;
  height:45px;
}

.option a{
  text-decoration: none;
  color: #e1effd;
  font-size: 1.5rem;
  font-family: 'Lato',sans-serif;
}

.option i{
  margin-right: 20px;
}

.sidebar{
  background-color: #4A79F7;
  height:100vh;
  width: 320px;
  display:flex;
  flex-direction: column;
  padding: 50px;
  border-radius: 0 15px 15px 0;
  filter:drop-shadow(0 0 4px rgba(0,0,0,0.5));
}

.navigation li{
  list-style: none;
}


</style>