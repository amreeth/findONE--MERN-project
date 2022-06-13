import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./GetPremiumScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { allPremiumList } from "../../actions/adminActions";
import { premiumPayment } from "../../actions/userActions";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import axios from "../../utils/axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useNavigate } from "react-router-dom";

const GetPremiumScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allpremiums = useSelector((state) => state.allPremiumList);
  const { loading, error, success, premiumList } = allpremiums;

  const payment = useSelector((state) => state.payment);
  const {
    loading: paymentLoading,
    error: payementError,
    success: paymentSuccess,
  } = payment;

  const [total, setTotal] = useState("");
  const [premiumId, setPremiumId] = useState("");
  const [sdkReady, setSdkReady] = useState(false);

  // console.log(premiumList, "premiumlist");

  useEffect(() => {
    dispatch(allPremiumList());
  }, [dispatch]);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("config/paypal");
      console.log(clientId);

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.scr = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!paymentSuccess) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [paymentSuccess]);

  const handleClick = (id) => {
    console.log(id, "here");
    const res = premiumList.filter((e) => {
      if (id === e._id) {
        return e;
      }
    });
    setTotal(res[0].price);
    setPremiumId(res[0]._id);
  };

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(premiumPayment({ premiumId, paymentResult }));
  };
  console.log(paymentSuccess,'payment success');

  if (paymentSuccess) {
    setTimeout(() => {
      navigate("/paymentsccess");
    }, 1000);
  }

  return (
    <>
      <Container fluid>
        <div class="containers">
          <div class="row m-0">
            <div class="col-md-7 col-12">
              {loading && <Loader />}
              {error && <Message>{error}</Message>}

              {premiumList &&
                premiumList.map((e) => (
                  <div class="row">
                    <div class="col-12 mb-4">
                      <div class="row box-right">
                        <div class="col-md-8 ps-0 ">
                          <input
                            type="radio"
                            value={e._id}
                            onChange={() => handleClick(e._id)}
                          />

                          <p class="ps-3 textmuted fw-bold h6 mb-0">{e.name}</p>
                          <p class="h1 fw-bold d-flex">
                            <span class=" fas fa-dollar-sign textmuted pe-1 h6 align-text-top mt-1"></span>
                            84,254 <span class="textmuted">.58</span>
                          </p>
                          <p class="ms-3 px-2 bg-green">
                            +10% since last month
                          </p>
                        </div>

                        <div class="col-md-4">
                          <p class="p-blue">
                            <span class="fas fa-circle pe-2"></span>Pending
                          </p>
                          <p class="fw-bold mb-3">
                            <span class="fas fa-dollar-sign pe-1"></span>1254
                            <span class="textmuted">.50</span>
                          </p>
                          <p class="p-org">
                            <span class="fas fa-circle pe-2"></span>On drafts
                          </p>
                          <p class="fw-bold">
                            <span class="fas fa-dollar-sign pe-1"></span>00
                            <span class="textmuted">.00</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div class="col-md-5 col-12 ps-md-5 p-0 ">
              <div class="box-left">
                <p class="textmuted h8">Invoice</p>
                <p class="fw-bold h7">Alex Parkinson</p>
                <p class="textmuted h8">3897 Hickroy St, salt Lake city</p>
                <p class="textmuted h8 mb-2">Utah, United States 84104</p>
                <div class="h8">
                  <div class="row m-0 border mb-3">
                    <div class="col-6 h8 pe-0 ps-2">
                      <p class="textmuted py-2">Items</p>
                      <span class="d-block py-2 border-bottom">
                        Legal Advising
                      </span>
                      <span class="d-block py-2">Expert Consulting</span>
                    </div>
                    <div class="col-2 text-center p-0">
                      <p class="textmuted p-2">Qty</p>{" "}
                      <span class="d-block p-2 border-bottom">2</span>{" "}
                      <span class="d-block p-2">1</span>{" "}
                    </div>{" "}
                    <div class="col-2 p-0 text-center h8 border-end">
                      <p class="textmuted p-2">Price</p>{" "}
                      <span class="d-block border-bottom py-2">
                        <span class="fas fa-dollar-sign"></span>500
                      </span>{" "}
                      <span class="d-block py-2 ">
                        <span class="fas fa-dollar-sign"></span>400
                      </span>{" "}
                    </div>{" "}
                    <div class="col-2 p-0 text-center">
                      <p class="textmuted p-2">Total</p>{" "}
                      <span class="d-block py-2 border-bottom">
                        <span class="fas fa-dollar-sign"></span>1000
                      </span>{" "}
                      <span class="d-block py-2">
                        <span class="fas fa-dollar-sign"></span>400
                      </span>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div class="d-flex h7 mb-2">
                    <p class="">Total Amount</p>{" "}
                    <p class="ms-auto">
                      <span class="fas fa-dollar-sign"></span>
                      {total}
                    </p>
                  </div>
                  <div class="h8 mb-5">
                    {paymentLoading && <Loader />}
                    {/* {!sdkReady ?(
                      <Loader/>
                    ):(
                    )} */}
                    <PayPalButton
                      amount={total}
                      onSuccess={successPaymentHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default GetPremiumScreen;
