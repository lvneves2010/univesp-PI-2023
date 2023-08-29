import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const { fireBApiKey } = require( '../.env' )

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            },
            addPost(state, post) {
                state.loadedPosts.unshift(post)
            },
            editPost(state, editedPost) {
                const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id )
                state.loadedPosts[postIndex] = editedPost
            },
            deletePost(state, deletedPost) {
                const postIndex = state.loadedPosts.findIndex(post => post.id === deletedPost.id )
                state.loadedPosts.splice(postIndex, 1)
            },
            setToken(state, token) {
                state.token = token
            },
            clearToken(state) {
                state.token = null
            }
        },
        actions: {
            nuxtServerInit( vuexContext, context ) {
                return axios.get(process.env.baseUrl + '/posts.json')
                .then(res => {
                    const postsArray = []
                    for ( const key in res.data ) {
                        postsArray.unshift({...res.data[key], id: key})
                    }
                    vuexContext.commit( 'setPosts', postsArray )
                })
                .catch(e => context.error(e))
            },
            addPost(vuexContext, post) {
                const createdPost = {...post, updatedDate: new Date()}
                return axios.post('https://leon-nuxt-blog.firebaseio.com/posts.json?auth=' + vuexContext.state.token, createdPost)
                .then(res => {
                    vuexContext.commit( 'addPost', {...createdPost, id: res.data.name} )
                })
                .catch(e => console.log(e))},
            editPost(vuexContext, editedPost) {
                return axios.put('https://leon-nuxt-blog.firebaseio.com/posts/' + editedPost.id + '.json?auth=' + vuexContext.state.token, editedPost)
                .then(res => vuexContext.commit( 'editPost', editedPost ) )
                .catch(e =>console.log(e))},
            deletePost(vuexContext, deletedPost) {
                return axios.delete('https://leon-nuxt-blog.firebaseio.com/posts/' + deletedPost.id + '.json?auth=' + vuexContext.state.token, deletedPost)
                .then(res => vuexContext.commit( 'deletePost', deletedPost ) )
                .catch(e =>console.log(e))
            },
            setPosts(vuexContext, posts) {
                vuexContext.commit( 'setPosts', posts )
            },
            authenticateUser(vuexContext, authData) {
                let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + fireBApiKey
                if(!authData.isLogin) {
                    authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + fireBApiKey
                }
                return axios.post(authUrl, {
                  email: authData.email,
                  password: authData.password,
                  returnSecureToken: true  
                  })
                  .then(res => {
                      vuexContext.commit( 'setToken', res.data.idToken)
                      localStorage.setItem( 'token', res.data.idToken )
                      localStorage.setItem( 'tokenExpiration', new Date().getTime() + Number.parseInt( res.data.expiresIn ) * 1000)
                      Cookie.set('jwt', res.data.idToken)
                      Cookie.set('expirationDate', new Date().getTime() + Number.parseInt( res.data.expiresIn ) * 1000)
                    //   Cookies.set('name', 'value', { sameSite:'none' })
                    //   return axios.post('http://localhost:3000/api/track-data', {
                    //       data: 'Authenticated'
                    //   })
                  })
                  .catch(e => alert(e))
            },
            initAuth(vuexContext, req) {
                let token
                let expirationDate
                if(req) {
                    if(!req.headers.cookie) {
                        return
                    }
                    const jwtCookie = req.headers.cookie.split(';').find( c => c.trim().startsWith('jwt=') )
                    if(!jwtCookie) {
                        return
                    }
                    token = jwtCookie.split('=')[1];
                    expirationDate = req.headers.cookie.split(';').find( c => c.trim().startsWith('expirationDate=') ).split('=')[1]
                } else if(process.client) {
                    token = localStorage.getItem("token");
                    expirationDate = localStorage.getItem("tokenExpiration");
                }
                if(new Date().getTime() > +expirationDate || !token) {
                    // console.log('No token or invalid token')
                    vuexContext.dispatch('logout')
                    return
                }
                
                vuexContext.commit('setToken', token)
            },
            logout(vuexContext) {
                vuexContext.commit('clearToken')
                Cookie.remove('jwt')
                Cookie.remove('expirationDate')
                if(process.client) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('tokenExpiration')
                }
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },
            isAuthenticated(state) {
                return state.token != null
            }
        }
    })
}

export default createStore