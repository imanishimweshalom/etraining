import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../../layouts/PublicLayout";

import Home from "../../pages/Home/Home";
import Register from "../../pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;