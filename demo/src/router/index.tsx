import { createBrowserRouter } from 'react-router-dom';
import { BaseLayout, ChildrenLayout } from '@/layout';
import { Home, Description, Button, Quickly, Icon, Typography } from '@/view';

const routers = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'develop',
        element: <ChildrenLayout />,
        children: [
          {
            path: 'desc',
            element: <Description />,
          },
          {
            path: 'quickly',
            element: <Quickly />,
          },
        ],
      },
      {
        path: 'module',
        element: <ChildrenLayout />,
        children: [
          {
            path: 'button',
            element: <Button />,
          },
          {
            path: 'icon',
            element: <Icon />,
          },
          {
            path: 'typography',
            element: <Typography />,
          },
        ],
      },
    ],
  },
]);

export default routers;
