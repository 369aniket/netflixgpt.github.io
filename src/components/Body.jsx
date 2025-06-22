import Login from "./Login";
import Browse from "./Browse";
import Admin from "./Admin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Body = () => {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
