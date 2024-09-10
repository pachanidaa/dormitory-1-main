// Layout ของหอพักนักศึกษา กำหนด Routes เส้นทางที่นี่
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../../App.css";
import { HistoryOutlined,ApartmentOutlined, HomeOutlined,WalletOutlined,SolutionOutlined,TeamOutlined ,ToolOutlined,FormOutlined} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button, message } from "antd";
import logo from "../../assets/logo.png";
import Homepages from "../../pages/homepage";
import Paymentpages from "../../pages/payment";
import DormBookingpages from "../../pages/dorm";
import Personal from "../../pages/personal";
import Listpages from "../../pages/list";
import Repairpages from "../../pages/repair";
import DelayedPaymentpages from "../../pages/form/DelayedPaymentForm";
import EnExitingpages from "../../pages/form/EnExitingForm";
import Resigningpages from "../../pages/form/ResigningForm";
import Statusgpages from "../../pages/status";
import PersonalCreate from "../../pages/personal/create";
const { Header, Content, Footer, Sider } = Layout;


const FullLayout: React.FC = () => {
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
              defaultSelectedKeys={[page ? page : "homepage"]}
              mode="inline"
            >
              <Menu.Item
                key="homepage"
                onClick={() => setCurrentPage("homepage")}
              >
                <Link to="/">
                 <HomeOutlined /> 
                  <span>หน้าหลัก</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="personal"
                onClick={() => setCurrentPage("personal")}
              >
                <Link to="/personal">
                  <SolutionOutlined /> 
                  <span>ข้อมูลส่วนตัว</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="dorm-booking"
                onClick={() => setCurrentPage("dorm-booking")}
              >
                <Link to="/dorm-booking">
                 <ApartmentOutlined /> 
                  <span>จองหอพัก</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="list"
                onClick={() => setCurrentPage("list")}
              >
                <Link to="/list">
                  <TeamOutlined /> 
                  <span>รายชื่อผู้พัก</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="payment"
                onClick={() => setCurrentPage("payment")}
              >
                <Link to="/payment">
                  <WalletOutlined />
                  <span>แจ้งยอดชำระ</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="repair"
                onClick={() => setCurrentPage("repair")}
              >
                <Link to="/repair">
                 <ToolOutlined /> 
                  <span>แจ้งซ่อม</span>
                </Link>
              </Menu.Item>
              <Menu.SubMenu
                key="form"
                title={
                  <span>
                   <FormOutlined /> 
                    <span>แบบฟอร์ม</span>
                  </span>
                }
              >
                <Menu.Item key="DelayedPayment">
                  <Link to="/form/DelayedPayment">
                    <span>ฟอร์มผ่อนผัน</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="EnExiting">
                  <Link to="/form/EnExiting">
                    <span>ฟอร์มขออนุญาตเข้า-ออก</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="Resigning">
                  <Link to="/form/Resigning">
                    <span>ฟอร์มลาออก</span>
                  </Link>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.Item
                key="status"
                onClick={() => setCurrentPage("status")}
              >
                <Link to="/status">
                <HistoryOutlined />
                  <span>ติดตามสถานะ</span>
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
              <Route path="/" element={<Homepages />} />
              <Route path="/personal" element={<Personal />} />
              <Route path="/personal/create" element={<PersonalCreate />} />
              <Route path="/payment" element={<Paymentpages />} />
              <Route path="/dorm-booking" element={<DormBookingpages />} />
              <Route path="/list" element={<Listpages />} />
              <Route path="/repair" element={<Repairpages />} />
              <Route path="/form/DelayedPayment" element={<DelayedPaymentpages />} />
              <Route path="/form/EnExiting" element={<EnExitingpages />} />
              <Route path="/form/Resigning" element={<Resigningpages />} />
              <Route path="/status" element={<Statusgpages />} />


            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Dormitory
        </Footer>
      </Layout>
    </Layout>
  );
};
export default FullLayout;