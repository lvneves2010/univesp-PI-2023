const pkg = require('./package')
const bodyParser =  require('body-parser')
const axios = require('axios')


export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Leon - Web Development Blog',
    htmlAttrs: {
      lang: 'pt-br'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'application developer resume sites profissionais aplicativos desenvolvedor JavaScript Angular VueJS SEO NodeJS programação cloud programador web' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/touch-icon-iphone.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/touch-icon-ipad.png' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }, env: {
    baseUrl: process.env.BASE_URL || 'https://leon-nuxt-blog.firebaseio.com'
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  router: {
    // middleware: 'log'
  },
  serverMiddleware: [
    bodyParser.json(),
    '~/api'  
  ],
  generate: {
    routes: function() {
      return axios.get('https://leon-nuxt-blog.firebaseio.com/posts.json')
      .then(res => {
        const routes = []
        for (const key in res.data) {
          routes.push({
            route:'/posts/' + key,
          payload: {postData: res.data[key]}
        })
        }
        return routes
      })
    }
  }
}
