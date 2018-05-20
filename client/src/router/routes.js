import Posts from '@/components/pages/PostsPage'
import NewPost from '@/components/pages/NewPostPage'
import EditPost from '@/components/pages/EditPostPage'
import Login from '@/components/pages/auth/LoginPage'
import Register from '@/components/pages/auth/RegisterPage'

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
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }

]
export default routes
