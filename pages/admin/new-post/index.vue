<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
        <AdminPostForm @submit="onSubmit"/>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { VueEditor } from "vue2-editor";
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
    layout: 'admin',
    middleware: [ 'check-auth', 'auth' ],
    components: {
        AdminPostForm,
        VueEditor
    },
    methods: {
        onSubmit(postData) {
            this.$store.dispatch( 'addPost', postData )
                .then(() => {
                    alert('post adicionado com sucesso')
                    this.$store.dispatch( 'nuxtServerInit' )
                    this.$router.push('/admin')
                })
        }
    }
};
</script>

<style scoped>
.admin-new-post-page {
    padding: 30px;
}
.new-post-form {
    width: 90%;
    margin: 10px auto
}

@media (min-width: 768px) {
    .new-post-form {
        width: 90%;
        margin: 10px auto
    }
}
</style>