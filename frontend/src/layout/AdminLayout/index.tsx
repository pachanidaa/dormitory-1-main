// Layout ของ Admin

import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../../App.css";
import { HomeOutlined, UserAddOutlined} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button, message } from "antd";
import logo from "../../assets/logo.png";
import Adminpages from "../../pages/adminpage";
import Student from"../../pages/student";
import StudentCreate from"../../pages/student/create";
import StudentEdit from"../../pages/student/edit";

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout: React.FC = () => {
  const page = localStorage.getItem("page");
  const [messageApi, contextHolder] = message.useMessage();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
   
  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };
  const Logout = () => {
    localStorage.clear();
    messageApi.success("ออกจากระบบสำเร็จ");
    setTimeout(() => {
      location.href = "/";
    }, 2000);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {contextHolder}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          backgroundColor: '#0c1327',  // Sidebar
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: "80%" }}
              />
            </div>
            <Menu
              theme="dark"
              style={{
                backgroundColor: '#0c1327',  // Sidebar
              }}
              defaultSelectedKeys={[page ? page : "adminpage"]}
              mode="inline"
            >
              <Menu.Item
                key="adminpage"
                onClick={() => setCurrentPage("adminpage")}
              >
                <Link to="/">
                  <HomeOutlined />
                  <span>แจ้งข่าวสาร</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="student"
                onClick={() => setCurrentPage("student")}
              >
                <Link to="/student">
                  <UserAddOutlined />
                  <span>ข้อมูลนักศึกษา</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
          <Button onClick={Logout} style={{ margin: 4 }}>
            ออกจากระบบ
          </Button>
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} />
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/" element={<Adminpages />} />
              <Route path="/student" element={<Student />} />
              <Route path="/student/create" element={<StudentCreate />} />
              <Route path="/student/edit/:id" element={<StudentEdit />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Dormitory Admin
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;