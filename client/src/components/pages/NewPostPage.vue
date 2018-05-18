<template>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>Новая запись</h1>
          <form class="form-group">
            <input class="form-control" type="text" name="title" id="title" placeholder="Заголовок" v-model.trim="post.title"/>
            <textarea class="form-control" type="text" rows="5" name="description" id="description"
            placeholder="Описание" v-model.trim="post.description"
            ></textarea>
            <button class="btn btn-ptimary btn-block" type="button" name="addPost" id="addPost" @click="addPost()">Содать запись</button>
            <button class="btn btn-success btn-block" type="button" @click="goBack()">Назад</button>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
  import PostsService from '@/services/PostsService'
  export default {
    name: 'NewPostPage',
    data () {
      return {
        post: {
          title: '',
          description: ''
        }
      }
    },
    methods: {
      async addPost () {
        if (this.post.title !== '' && this.post.description !== '') {
          await PostsService.addNewPost({
            title: this.post.title,
            description: this.post.description
          })
          this.$router.push({name: 'Posts'})
        } else {
          alert('Необходимо заполнить все поля')
        }
      },
      goBack () {
        this.$router.push({name: 'Posts'})
      }
    }

  }
</script>

<style scoped>

</style>
