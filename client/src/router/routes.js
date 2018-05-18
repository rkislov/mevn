import Posts from '@/components/pages/PostsPage'
import NewPost from '@/components/pages/NewPostPage'
import EditPost from '@/components/pages/EditPostPage'

const routes = [
  {
    path: '/',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/posts/new',
    name: 'NewPost',
    component: NewPost
  },
  {
    path: '/post/:id',
    name: 'EditPost',
    component: EditPost
  }

]
export default routes
