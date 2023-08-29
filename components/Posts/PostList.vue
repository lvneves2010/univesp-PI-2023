<template>
    <section class="post-list">
      <PostPreview
      v-for="post in posts" :key="post.id" 
      :id="post.id"
      :is-admin="isAdmin"
      :title="post.title"
      :previewText="post.previewText"
      :thumbnail="post.thumbnail"/>
      <!-- thumbnail="https://static.vecteezy.com/system/resources/previews/000/518/613/non_2x/abstract-technology-background-concept-circle-circuit-digital-metal-blue-on-hi-tech-future-design-vector.jpg"/> -->
    </section>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview'
export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin : {
      type: Boolean,
      default: false
    },
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>