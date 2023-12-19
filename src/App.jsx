import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ContextProvider from './features/context';
import { HomeLayout, Landing, About, Error } from './pages';
import { loader as HomeLayoutLoader } from './pages/HomeLayout';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    loader: HomeLayoutLoader(queryClient),
    id: 'idHomeLayout',
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </ContextProvider>
    </QueryClientProvider>
  );
}
export default App;
