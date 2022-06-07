import React, { useEffect } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import { listUsers } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/admin/Header";
import Sidebar from "../../Components/admin/Sidebar";
import DataTable from "react-data-table-component";

const UserManagement = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  console.log(users);

  if(users){
    console.log(users.name);
    console.log(users.email);
  }


  const navigate = useNavigate();

  useEffect(() => {
    const adminInfo = localStorage.getItem("adminInfo");
    if (adminInfo) {
      dispatch(listUsers());
    } else {
      navigate("/admin");
    }
  }, [dispatch]);


  const block=(id)=>{
    console.log(id,'dddd');
  }

  const coloums = [
    {
      name:"No",
      selector:(row)=>row.index
    },
    {
      name: "Image",
      selector: (row) => <img width={50} height={50} src={row.avatar.url} />,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable:true
    },
    {
      name: "Email",
      selctor: (row) => row.email,
    },{
      name:"Manage",
      cell:row=><button className="btn btn-danger" onClick={()=>block(row._id)}>Block</button>
    }
  ];

  return (
    <>
      <Header />
      <Container fluid className="mt-2">
        <Row>
          <Col lg={2} className="border mx-auto">
            <Sidebar />
          </Col>

          <Col lg={9} className="border mx-auto">

            {loading&&<Loader></Loader>}
            {error&&<Message>{error}</Message>}
            <DataTable
              title="Users"
              columns={coloums}
              data={users}
              pagination
              fixedHeader
              fixedHeaderScrollHeight="400px"
              highlightOnHover
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserManagement;
