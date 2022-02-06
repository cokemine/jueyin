import Layout from '../pages/Layout';
import Post from '../pages/Post';

const routes = [
  {
    path: '/',
    component: Layout
  },
  {
    path: '/category/:id/:sub_id?',
    component: Layout
  },
  {
    path: '/post/:id',
    component: Post
  }
];

export default routes;
