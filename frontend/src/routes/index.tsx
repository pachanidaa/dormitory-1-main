
import { useRoutes, RouteObject } from "react-router-dom";
import StudentRoutes from "./StudentRoutes";
import MainRoutes from "./MainRoutes";
import AdminRoutes from "./AdminRoutes";

function ConfigRoutes() {
  const isLoggedInStudent = localStorage.getItem("isLoginStudent") === "true";
  const isLoggedInAdmin = localStorage.getItem("isLoginAdmin") === "true"; 

  let routes: RouteObject[] = [];

  if (isLoggedInAdmin) {
    // ถ้า admin ล็อกอิน ให้ใช้เส้นทางของ admin
    routes = [AdminRoutes(isLoggedInAdmin)];
  } else if (isLoggedInStudent) {
    // ถ้า student ล็อกอิน ให้ใช้เส้นทางของ student
    routes = [StudentRoutes(isLoggedInStudent), MainRoutes()];
  } else {
    // ถ้าไม่มีใครล็อกอิน ให้ใช้เส้นทางทั่วไป
    routes = [MainRoutes()];
  }

  return useRoutes(routes);
}

export default ConfigRoutes;
