import React, { useEffect } from "react";
import Header from "../../Components/admin/Header";
import Sidebar from "../../Components/admin/Sidebar";
import Footer from "../../Components/admin/Footer";
import { Container, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import { getAllPremiumUsers } from "../../actions/adminActions";
import { useNavigate } from "react-router-dom";

const AllPremiumUsersScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allPremiumUsers = useSelector((state) => state.allPremiumUsers);
  const { loading, error, premiumUsers, success } = allPremiumUsers;

  useEffect(() => {
    const adminInfo = localStorage.getItem("adminInfo");
    if (adminInfo) {
      dispatch(getAllPremiumUsers());
    } else {
      navigate("/admin");
    }
  }, [dispatch]);

  console.log(premiumUsers, "userssss");

  const approvePayment = () => {

  };

  const coloums = [
    {
      name: "Uer Name",
      selector: (row) => row.userName,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Validity",
      selector: (row) => row.valid,
    },{
        name:"Purchase Date",
        selector:(row)=>row.createdAt
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Payment Status",
      selector: (row) => row.status,
    },
    {
      name: "Payment Approve",
      cell: (row) => (
        <button
          className="btn btn-danger"
          onClick={() => approvePayment(row._id)}
        >
          Approve
        </button>
      ),
    },
  ];

  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Col lg={2} className="border mx-auto">
            <Sidebar />
          </Col>
          <Col lg={9}>
            {loading && <Loader></Loader>}
            {error && <Message>{error}</Message>}
            <DataTable
              title="Premium Users"
              columns={coloums}
              data={premiumUsers}
              pagination
              fixedHeader
              fixedHeaderScrollHeight="400px"
              highlightOnHover
            />
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
};

export default AllPremiumUsersScreen;
