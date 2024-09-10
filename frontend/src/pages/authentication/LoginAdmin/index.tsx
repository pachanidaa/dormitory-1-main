import { Button, Card, Form, Input, message, Flex, Row, Col } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { SignInAdmin } from "../../../services/https";
import { SignInAdminInterface } from "../../../interfaces/SignInAdmin";
import AdminLogo from "../../../assets/admin-logo.png"; 
import { useNavigate } from "react-router-dom";

function SignInAdminPages() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: SignInAdminInterface) => {
    let res = await SignInAdmin(values);
    if (res.status === 200) {
      messageApi.success("เข้าสู่ระบบสำเร็จ");
      localStorage.setItem("isLoginAdmin", "true");
      localStorage.setItem("page", "adminpage");
      localStorage.setItem("token_type", res.data.token_type);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.id);
      setTimeout(() => {
        location.href = "/";
      }, 2000);
    } else {
      messageApi.error(res.data.error);
    }
  };

  return (
    <>
      {contextHolder}
      <Flex justify="center" align="center" className="login-admin" style={{ height: '100vh' }}>
        <Card className="card-login" style={{ width: 400, padding: '0px' }}>
         <Row align="middle" justify="center" style={{ height: "auto" }}>
            <Col xs={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '0px' }}>
              <img alt="AdminLogo" style={{ width: "60%", maxWidth: 250 ,marginTop: '10px' }} src={AdminLogo} className="images-admin-logo" />
              <p style={{ marginTop: '10px', fontSize: '30px', color: '#003366'}}>Admin</p>
            </Col>
            <Col xs={24}>
              <Form style={{ marginTop: '-15px'}} name="basic" onFinish={onFinish} autoComplete="off" layout="vertical">
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: "Please input your Username!" }]}
                  style={{ marginBottom: '20px' }} // Adjust margin here
                >
                  <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                  style={{ marginBottom: '20px' }} // Adjust margin here
                >
                  <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="admin-form-button"
                    style={{ marginBottom: 0 }}
                  >
                    Log in
                  </Button>
                  Or <a onClick={() => navigate("/signin")}>student click!</a>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </Flex>
    </>
  );
  
}


export default SignInAdminPages;
