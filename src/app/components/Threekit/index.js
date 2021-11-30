import React, { useState, useEffect } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import Threekit_Player from "./Player";

const Threekit = (props) => {
  const [playerModel, setPlayerModel] = useState(null);

  return (
    <>
      <Row id="player-container">
        <Col className="p-0">
          <Threekit_Player model={playerModel} />
        </Col>
      </Row>
    </>
  );
};

export default Threekit;
