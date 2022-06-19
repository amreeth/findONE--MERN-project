import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./GetPremiumScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { allPremiumLists } from "../../actions/userActions";
import { premiumPayment } from "../../actions/userActions";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import axios from "../../utils/axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/user/Header/Header";
import Footer from "../../Components/user/Footer/Footer";

const GetPremiumScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allpremiums = useSelector((state) => state.allPremiumsLists);
  const { loading, error, success, premiumList } = allpremiums;

  const payment = useSelector((state) => state.payment);
  const {
    loading: paymentLoading,
    error: payementError,
    success: paymentSuccess,
  } = payment;

  const [total, setTotal] = useState("");
  const [premiumId, setPremiumId] = useState("");
  const [name, setName] = useState("");
  const [days, setDays] = useState("");
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    dispatch(allPremiumLists());
  }, [dispatch]);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("config/paypal");
      // console.log(clientId);
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
    const res = premiumList.filter((e) => {
      if (id === e._id) {
        return e;
      }
    });
    setTotal(res[0].price);
    setPremiumId(res[0]._id);
    setName(res[0].name);
    setDays(res[0].days);
  };

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(premiumPayment({ premiumId, paymentResult }));
  };
  console.log(paymentSuccess, "payment success");

  if (paymentSuccess) {
    setTimeout(() => {
      navigate("/paymentsccess");
    }, 1000);
  }

  return (
    <>
      <Header />
      <Container>
        <div className="containers">
          <div className="row ">
            <div className="col-md-7 col-12">
              {loading && <Loader />}
              {error && <Message>{error}</Message>}

              {premiumList &&
                premiumList.map((e) => (
                  <div className="row" key={e._id}>
                    <div className="col-12 mb-2">
                      <div className="row box-right">
                        <div className="col-md-8 ps-0  ">
                          <div className="d-flex">
                            <input
                              type="radio"
                              value={e._id}
                              onChange={() => handleClick(e._id)}
                            />
                            <p className="h1 fw-bold d-flex">{e.name}</p>
                          </div>
                          <h3 className="ms-3 px-2 bg-green">
                            {e.days} days validity  
                          </h3>
                        </div>
                        <div className="col-md-4">
                          <h2>
                            <span className="fa fa-inr"></span> {e.price}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="col-md-5 col-12 ps-md-5 p-0 ">
              <div className="box-left">
                <h5 className="fw-bold ">Category : {name}</h5>
                <h6 className="textmuted">Days: {days}</h6>

                <div className="h8 ">
                  <div className="d-flex h7  mt-4">
                    <h4 className="">Total Amount</h4>
                    <h4 className="ms-auto">
                      <span className="fa fa-inr"></span>
                      {total}
                    </h4>
                  </div>

                  <div className="h8 mb-5 mt-2">
                    {paymentLoading && <Loader />}
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
      <Footer />
    </>
  );
};

export default GetPremiumScreen;
