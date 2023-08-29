<template>
  <div class="single-post-page">
      <section class="post">
          <h2 class="post-title">{{loadedPost.title}}</h2>
          <div class="post-details">
            <div class="post-detail">Last Upadted on: {{ loadedPost.updatedDate | date }}</div>
              <div class="post-detail">Writen By: {{loadedPost.author}} </div>
          </div>
          <div class="post-content2" v-html="loadedPost.content"></div>
          <!-- <p class="post-content">{{loadedPost.content}}</p> --> 
      </section>
      <section class="post-feedback">
          <p>Let your comment here <a href="mailto: lvneves2010@gmail.com">lvneves2010@gmail.com</a> </p>
      </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  asyncData(context) {
    if(context.payload) {
      return {
        loadedPost: context.payload.postData
      }
    }
    return axios.get(process.env.baseUrl + '/posts/' + context.params.id + '.json')
    .then(res => {
      return {
        loadedPost: res.data
      }
    })
    .catch(e => context.error(e))
  }
}
</script>

<style>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post-content2 {
  width: 100%
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}

.ql-syntax {
    white-space: normal;
    background-color: black;
    color: floralwhite;
    border-radius: 5px;
}

</style>