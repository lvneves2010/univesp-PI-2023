<template>
  <div class="home-page">
    <section class="intro">
      <h1 class="intro-content">Blog para Escotismo </h1>
      <p class="intro-content" >Projeto integrador para o curso de engenharia da computação da UNIVESP</p>
      <p class="intro-content">Polo Guarulhos</p>
      <p class="intro-content" >2o. Semestre 2023</p>
    </section>
    <PostList :posts="loadedPosts" />
    <section class="intro">
    </section>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$store.dispatch( 'nuxtServerInit' )
  },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  },
}
</script>

<style>
.intro {
  min-height: 400px;
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  background-image: url('~assets/images/desktop.jpeg');
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: relative;
  top: 5%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

.intro-content {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;
}

ul.intro-content {
  display: flex;
  justify-content: space-around;
  flex-flow: wrap;
}

@media (max-width: 610px) {
  ul.intro-content {
    flex-direction: column;
    list-style: none;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

</style>
