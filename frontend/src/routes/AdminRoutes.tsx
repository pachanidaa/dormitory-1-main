import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loadable from "../components/third-patry/Loadable";
import AdminLayout from "../layout/AdminLayout";
const LoginAdmin = Loadable(lazy(() => import("../pages/authentication/LoginAdmin")));
const Adminpages = Loadable(lazy(() => import("../pages/adminpage")));
const Student = Loadable(lazy(() => import("../pages/student")));
const StudentCreate = Loadable(lazy(() => import("../pages/student/create")));
const StudentEdit = Loadable(lazy(() => import("../pages/student/edit")));

const AdminRoutes = (isLoggedInAdmin : boolean): RouteObject => {
  return {
    path: "/",
    element: isLoggedInAdmin ? <AdminLayout /> : <LoginAdmin />,
    children: [
      {
        path: "/",
        element: <Adminpages />,
      },
      {
        path: "/student",
        children: [
          {
            path: "/student",
            element: <Student />,
          },
          {
            path: "/student/create",
            element: <StudentCreate />,
          },
          {
            path: "/student/edit/:id",
            element: <StudentEdit />,
          },
        ],
      }
    ],
  };
};
export default AdminRoutes;