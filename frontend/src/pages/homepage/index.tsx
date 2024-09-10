import { Col, Row,Divider} from "antd";
function Homepages() {
  // ข้อมูลสำหรับตาราง
  
  return (
    <div >
      <Row>
        <Col span={12}>
          <h2 style={{color: '#1f1f1f'}}>หน้าหลัก</h2>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col>
        <p> 
          No matter what
        </p>
        </Col>
      </Row>
      
    </div>
  );
}

export default Homepages;
