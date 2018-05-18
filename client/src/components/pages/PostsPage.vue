<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1>Публикации</h1>
                <h6>Тут будут отображены все доступные публикации</h6>
              <div>
                <router-link :to="{ name: 'NewPost'}">Добавить публикацию</router-link>
              </div>
            <div class="card " v-if="posts.length">
                <div class="card-header card-success">
                    список публикаций:
                </div>
             <div class="card-body">
                <table class="table table-striped">
                    <tr>
                        <th>Заголовок</th>
                        <th>Описание</th>
                        <th>Действие</th>
                    </tr>
                    <tr v-for="post in posts" :key="post.index">
                      <td>{{post.title}}</td>
                       <td>{{post.description}}</td>
                      <td>
                        <router-link :to="{name: 'EditPost', params: {id: post._id}}">Редактировать</router-link> |
                        <button class="btn btn-danger bnt-sm" type="button" @click="removePost(post._id)">Удалить</button>
                      </td>
                    </tr>
                </table>
             </div>
            </div>
            <div class="card card-header" v-else>
                <p>Нет ни одной публикации</p>

            </div>
            </div>
        </div>
    </div>
</template>
<script>
import PostService from '@/services/PostsService'
export default {
  name: 'PostPage',
  data: function () {
    return {
      posts: []
    }
  },
  methods: {
    async getPosts () {
      const response = await PostService.fetchPosts()
      this.posts = response.data.posts
    },
    async removePost (id) {
      await PostService.deletePost(id)
      this.getPosts()
    }
  },
  mounted: function () {
    this.getPosts()
  }
}
</script>
<style>

</style>
