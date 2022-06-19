import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";

const Profit = () => {
  const [profit, setProfit] = useState(null);

  const getProfit = async () => {
    let adminInfo = localStorage.getItem("adminInfo");
    adminInfo = JSON.parse(adminInfo);

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get("admin/profit", config);
    setProfit(data);
  };

  console.log(profit);

  useEffect(() => {
    getProfit();
  }, []);

  return (
    <>
      <div
        className="col-lg-3 border"
        style={{ width: "15rem", height: "10rem" }}
      >
        <h6>Total profit</h6>
        <h5>{profit}</h5>
      </div>
    </>
  );
};

export default Profit;
