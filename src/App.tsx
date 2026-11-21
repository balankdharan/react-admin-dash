import Home from "./pages/home/Home";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import FormPage from "./components/form/FormPage";
import KanbanBoard from "./components/kanban/KanbanBoard";
import Orders from "./pages/orders/Orders";
import Posts from "./pages/posts/Posts";
import Calendar from "./pages/calendar/Calendar";
import Settings from "./pages/settings/Settings";
import Backups from "./pages/backups/Backups";
import Charts from "./pages/charts/Charts";
import ActivityLog from "./pages/activity/ActivityLog";
import { AdminStoreProvider, useAdminStore } from "./store/AdminStore";

function App() {
  const Layout = () => {
    const { data } = useAdminStore();
    const location = useLocation();

    if (!data.session) {
      return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contactContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/users", element: <Users /> },
        { path: "/users/:id", element: <User /> },
        { path: "/products", element: <Products /> },
        { path: "/products/:id", element: <Product /> },
        { path: "/orders", element: <Orders /> },
        { path: "/posts", element: <Posts /> },
        { path: "/kanban", element: <KanbanBoard /> },
        { path: "/form", element: <FormPage /> },
        { path: "/calendar", element: <Calendar /> },
        { path: "/settings", element: <Settings /> },
        { path: "/backups", element: <Backups /> },
        { path: "/charts", element: <Charts /> },
        { path: "/logs", element: <ActivityLog /> },
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <AdminStoreProvider>
      <RouterProvider router={router} />
    </AdminStoreProvider>
  );
}

export default App;
