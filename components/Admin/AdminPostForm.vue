<template>
      <form @submit.prevent="onSave" >
        <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>

        <AppControlInput v-model="editedPost.title">Title</AppControlInput>

        <AppControlInput v-model="editedPost.thumbnail">Thumbnail Link</AppControlInput>

        <VueEditor v-model="editedPost.content" placeholder="Conteúdo do artigo" />

        <AppControlInput control-type="textarea" v-model="editedPost.previewText">Preview Text</AppControlInput>
        <AppButton type="submit">Save</AppButton>

        <AppButton
          type="button"
          style="margin-left: 10px"
          btn-style="cancel"
          @click="onCancel"
        >Cancel</AppButton>
        <AppButton
          type="button"
          style="margin-left: 10px"
          btn-style="cancel"
          @click="onDelete"
        >Delete</AppButton>

      </form>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    components: { VueEditor },
    props: {
        post: {
            type: Object,
            required: false
        }
    },
    data() {
        return {
            editedPost: this.post ? {...this.post} : {
                author: '',
                title: '',
                thumbnail: '',
                content: '',
                previewText: ''
            }
        }
    },
    methods: {
        onSave() {
            this.$emit( 'submit', this.editedPost )
        },
        onCancel() {
            this.$router.push('/admin')
        },
        onDelete() {
            this.$emit( 'delete', this.post )
        }
    }

}
</script>

<style>

</style>