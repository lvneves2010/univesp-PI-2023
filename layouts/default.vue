<template>
  <div>
    <TheHeader @sidenavToggle="displaySidenav = !displaySidenav" />
    <TheSidenav :show="displaySidenav" @close="displaySidenav = false" />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import TheHeader from '../components/Navigation/TheHeader'
import TheSidenav from '../components/Navigation/TheSidenav'
import Footer from '../components/Navigation/Footer'
export default {
   name: 'deafaultLayout',
  //  middleware: 'log',
   components: {
     TheHeader,
     TheSidenav,
     Footer
   },
   data() {
     return {
       displaySidenav: false
     }
   }
}
</script>

<style>
html {
  font-family: 'Open Sans', 'sans-serif'
}

body {
  margin: 0;
}
</style>
