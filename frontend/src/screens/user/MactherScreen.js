import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";

const MactherScreen = ({ matched }) => { 

  const [match, setmatch] = useState({});

  useEffect(() => {
    const fetchMatch = async () => {
      const { data } = await axios.get(`/api/user/${matched.params.id}`);

      setmatch(data.match);
    };
    fetchMatch();
  }, [matched]);

  return <>fssfsdf</>;
};

export default MactherScreen;
