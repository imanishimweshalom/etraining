import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../../layouts/PublicLayout";
import Home from "../../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;