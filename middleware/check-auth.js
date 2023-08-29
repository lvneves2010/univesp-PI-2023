export default (context) => {
    // console.log( '[Middleware] Check-Auth' )
    context.store.dispatch("initAuth", context.req)
}