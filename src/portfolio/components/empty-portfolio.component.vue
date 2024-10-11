<script>
import sidebar from "../../public/sidebar.component.vue";

export default {
  name: "portfolio-list.component",
  components: { sidebar }
};
</script>

<template>
  <div class="container">
    <sidebar />

    <div class="content">
      <div class="titulo">
        <h1>Cartera de Letras</h1>
      </div>

      <div class="letter">

        <pv-card class="card">
          <template #content>
            <div class="card-content">
              <img src="/src/assets/puerkito-puerkito.png" alt="">
              <p>No tienes ninguna letra</p>
              <pv-button>
                Agregar letra
              </pv-button>
            </div>
          </template>
        </pv-card>

      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
  margin-left: 320px;
}

.p-button{
  background-color: #4A79F7;
  border-color: #4A79F7;
  color: white;
  border-radius: 15px;
  width: 12em;
  height: 2.5em;
  margin: 40px 50px;
  font-size: 25px;
}

.p-button:hover{
  background-color: #789cff !important;
  color: white !important;
  border-color: #789cff !important;
}

.titulo {
  color: #435a97;
  padding-top: 90px;
  font-family: 'Open Sans', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}

.card {
  margin-top: 30px;
  width: 90%;
  height: 70vh;
  background-color: white;
  box-shadow: 0 5px 5px rgb(0,0,0,0.2);
}
.card-content{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.card-content img{
  width: 250px;
  margin:40px 0 70px 0;
}
.card-content p {
  color: #5c5c5c;
  font-family: 'Open Sans', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 40px;
  text-align: center;
  margin:20px;
}

.letter{
  display:flex;
  justify-content:center;
  align-items: center;
}
</style>
