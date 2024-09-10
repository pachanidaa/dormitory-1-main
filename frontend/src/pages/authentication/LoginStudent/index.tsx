import { Button, Card, Form, Input, message, Flex, Row, Col } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { SignInStudent } from "../../../services/https";
import { SignInStudentInterface } from "../../../interfaces/SignInStudent";
import logo from "../../../assets/logo.png"; // Ensure you have the correct path for the logo image
import { useNavigate } from "react-router-dom";

function SignInStudentPages() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: SignInStudentInterface) => {
    let res = await SignInStudent(values);
    if (res.status === 200) {
      messageApi.success("เข้าสู่ระบบสำเร็จ");
      localStorage.setItem("isLoginStudent", "true");
      localStorage.setItem("page", "homepage");
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
      <Flex justify="center" align="center" className="login" style={{ height: '100vh' }}>
        <Card className="card-login" style={{ width: 400, padding: '0px' }}>
         <Row align="middle" justify="center" style={{ height: "auto" }}>
            <Col xs={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '0px' }}>
              <img alt="logo" style={{ width: "80%", maxWidth: 250 ,marginTop: '-20px' }} src={logo} className="images-logo" />
              <p style={{ marginTop: '10px', fontSize: '30px', color: '#003366'}}>Dormitory</p>
            </Col>
            <Col xs={24}>
              <Form style={{ marginTop: '-15px'}} name="basic" onFinish={onFinish} autoComplete="off" layout="vertical">
                <Form.Item
                  name="student_id"
                  rules={[{ required: true, message: "Please input your StudentID!" }]}
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
                    className="login-form-button"
                    style={{ marginBottom: 0 }}
                  >
                    Log in
                  </Button>
                  Or <a onClick={() => navigate("/signin-admin")}>admin click!</a>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </Flex>
    </>
  );
}

export default SignInStudentPages;
