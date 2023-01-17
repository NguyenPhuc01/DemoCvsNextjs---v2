import { Card } from "antd";
import React from "react";
import Image from "next/image";
const { Meta } = Card;
function CardHome(props) {
  return (
    <Card
      hoverable
      cover={<Image alt="example" src={props.src} style={{ height: "auto" }} />}
      style={{ Width: "100%", height: "100%" }}
    >
      <Meta title={props.title} description={props.description} />
    </Card>
  );
}

export default CardHome;
