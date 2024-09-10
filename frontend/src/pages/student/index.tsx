
import { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { ListStudents, DeleteStudentsById } from "../../services/https/index";
import { StudentInterface } from "../../interfaces/Student";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function Student() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const myId = localStorage.getItem("id");

  const columns: ColumnsType<StudentInterface> = [
    {
      title: "",
      render: (record) => (
        <>
          {myId == record?.ID ? (
            <></>
          ) : (
            <Button
              type="dashed"
              danger
              icon={<DeleteOutlined />}
              onClick={() => deleteStudentsById(record.ID)}
            ></Button>
          )}
        </>
      ),
    },
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "ชื่อ",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "นามสกุล",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "รหัสนักศึกษา",
      dataIndex: "student_id",
      key: "student_id",
    },
    {
      title: "วันเกิด",
      key: "birthday",
      render: (record) => <>{dayjs(record.birthday).format("dddd DD MMM YYYY")}</>,
    },
    {
      title: "ชั้นปี",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "สำนักวิชา",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "เพศ",
      key: "gender",
      render: (record) => <>{record?.gender?.gender}</>,
    },
    {
      title: "",
      render: (record) => (
        <>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => navigate(`/student/edit/${record.ID}`)}
          >
            แก้ไขข้อมูล
          </Button>
        </>
      ),
    },
  ];

  const deleteStudentsById = async (id: string) => {
    let res = await DeleteStudentsById(id);
    if (res.status == 200) {
      messageApi.open({
        type: "success",
        content: res.data.message,
      });
      await getStudents();
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  const getStudents = async () => {
    let res = await ListStudents();
    if (res.status == 200) {
      setStudents(res.data);
    } else {
      setStudents([]);
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>ข้อมูลนักศึกษา</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Space>
            <Link to="/student/create">
              <Button type="primary" icon={<PlusOutlined />}>
                สร้างข้อมูล
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
      <Divider />

      <div style={{ marginTop: 20 }}>
        <Table
          rowKey="ID"
          columns={columns}
          dataSource={students}
          style={{ width: "100%", overflow: "scroll" }}
        />

      </div>

    </>
  );
}

export default Student;
