import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import HomePage from './pages/HomePage';
import FriendPage from './pages/FriendPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/friends/:id',
    loader: async ({ params }) => {
      let response = await fetch(
        'http://localhost:3000/api/friends/' + params.id,
      );
      const friend = await response.json();
      return { friend };
    },
    Component: FriendPage,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
