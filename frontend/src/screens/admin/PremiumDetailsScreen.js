import React, { useEffect } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import Header from "../../Components/admin/Header";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import Sidebar from "../../Components/admin/Sidebar";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { allPremiumList } from "../../actions/adminActions";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const PremiumDetailsScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allpremiumList = useSelector((state) => state.allPremiumList);
  const { loading, error, premiumList } = allpremiumList;

  // console.log(allpremiumList,'all');
  // console.log(premiumList,'lists');

  const editPremium = (id) => {
    console.log(id);
  };

  useEffect(() => {
    const adminInfo = localStorage.getItem("adminInfo");
    if (adminInfo) {
      dispatch(allPremiumList());
    } else {
      navigate("/admin");
    }
  }, [dispatch]);



  const coloums = [
    {
      name: "No",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "No.of Days",
      selector: (row) => row.days,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Manage",
      cell: (row) => (
        <button className="btn btn-danger" onClick={() => editPremium(row._id)}>
          Edit
        </button>
      ),
    },
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
            <div>
            <LinkContainer to="/admin/addpremium">
              <Button>Add Premium Category</Button>
            </LinkContainer>
            </div>
            <Row>
              {loading && <Loader></Loader>}
              {error && <Message>{error}</Message>}
              <DataTable
                title="Premium List"
                columns={coloums}
                data={premiumList}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="400px"
                highlightOnHover
              />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PremiumDetailsScreen;
