<template>
  <div class="admin-post-page">
      <section class="update-form">
        <AdminPostForm :post="loadedPost" @submit="onSubmit" @delete="onDelete" />
      </section>
  </div>
</template>

<script>
import axios from 'axios'
import AdminPostForm from '@/components/Admin/AdminPostForm'
export default {
    layout: 'admin',
    middleware: [ 'check-auth', 'auth' ],
    components: {
        AdminPostForm
    },
    asyncData(context) {
      return axios.get(process.env.baseUrl + '/posts/' + context.params.postId + '.json')
      .then(res => {
        return {
          loadedPost: {...res.data, id: context.params.postId}
        }
      })
      .catch(e => context.error(e))
    },
    methods : {
      onSubmit(editedPost) {
        this.$store.dispatch( 'editPost', editedPost )
        .then(() => {
          this.$store.dispatch( 'nuxtServerInit' )
          this.$router.push('/admin')})
      },
      onDelete(deletedPost) {
        this.$store.dispatch( 'deletePost', deletedPost )
        .then(() => {
          this.$store.dispatch( 'nuxtServerInit' )
          this.$router.push('/admin')})
      }
    }
}
</script>

<style>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}

</style>