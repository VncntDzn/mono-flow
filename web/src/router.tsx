import { createBrowserRouter } from 'react-router-dom';
import { UnderMaintenance } from './features/error-pages/maintenance.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
    errorElement: <UnderMaintenance />,
  },
]);

export default router;
