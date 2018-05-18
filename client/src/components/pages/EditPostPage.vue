<template>
<section class="edit">
  <h1>Редактирование публикации {{this.$route.params.id}}</h1>
  <form @submit.prevent="editPost()">
    <div>
      <input type="text" id="title" name="title" placeholder="Название"
             v-model.trim="post.title">
    </div>
    <div>
      <input type="text" id="description" name="description" placeholder="Содержание"
             v-model.trim="post.description">
    </div>
    <button type="submit" name="editPost">Редактировать</button>
  </form>
  <router-link :to="{name: 'Posts'}">Назад</router-link>
</section>
</template>

<script>
  import PostsService from '@/services/PostsService'
    export default {
        name: 'EditPostPage',
      data () {
          return {
            post: {
              title: '',
              description: ''
            }
          }
      },
      methods: {
          async getPost () {
            const response = await PostsService.getPost({id: this.$route.params.id})
            this.post.title = response.data.title
            this.post.description = response.data.description
          },
        async editPost () {
            if (this.post.title !== '' && this.post.description !== '') {
              await PostsService.updatePost({
                id: this.$route.params.id,
                title: this.post.title,
                description: this.post.description
              })
              this.$router.push({name: 'Posts'})
            }
        }
      },
      mounted () {
          this.getPost()
      }
    }
</script>

<style scoped>

</style>
