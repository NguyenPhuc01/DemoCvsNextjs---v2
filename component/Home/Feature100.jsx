import React, { useState } from 'react';
import { Row, Col, Button, Tabs, Card } from 'antd';
import { trackEvent } from '../utils'
import { Link } from "gatsby-plugin-intl"
import styled from "styled-components";
import DemoImage from '../../../static/demo.jpg'

const { TabPane } = Tabs;

export default function Feature100(props) {
  const { dataSource, isMobile, ...rest } = props;
  const {
    wrapper,
    titleWrapper,
    page,
    content,
  } = dataSource;

  const [key, setKey] = useState('1')

  return (
    <div {...rest} {...wrapper}>
      <div {...page}>
        <div {...titleWrapper} />
    <div >
      <Row gutter={[30, 16]}>
        <Col md={6} xs={24}>
          <Link to="/ocr" onClick={() => trackEvent("/")}>
            <div className="feature100-content">
              <div>
                <img src="/Frame6.png" alt="image" style={{maxWidth: "100%"}} />
              </div>
              <div>
                <Styled>Nhận Diện Ký Tự</Styled>
                <Title>Giấy tờ tùy thân, Giấy tờ xe, Hóa đơn, Dữ liệu bảng, ...</Title>
              </div>
            </div>
          </Link>
        </Col>
        <Col md={6} xs={24}>
          <Link to="/facial-recognition" onClick={() => trackEvent("/")}>
            <div className="feature100-content">
              <div>
                <img src="/Frame7.png" alt="image" style={{maxWidth: "100%"}} />
              </div>
              <div>
                <Styled>Nhận Diện Khuôn Mặt</Styled>
                <Title>So khớp khuôn mặt, Tìm kiếm khuôn mặt, Tạo ảnh đại diện</Title>
              </div>
            </div>
          </Link>
        </Col>
        <Col md={6} xs={24}>
          <Link to="/ekyc" onClick={() => trackEvent("/")}>
            <div className="feature100-content">
              <div>
                <img src="/Frame9.png" alt="image" style={{maxWidth: "100%"}} />
              </div>
              <div>
                <Styled>eKYC</Styled>
                <Title>Định danh khách hàng trực tuyến</Title>
              </div>
            </div>
          </Link>
        </Col>
        <Col md={6} xs={24}>
          <Link to="/image-recognition" onClick={() => trackEvent("/")}>
            <div className="feature100-content">
              <div>
                <img src="/Frame8.png" alt="image" style={{maxWidth: "100%"}} />
              </div>
              <div>
                <Styled>Xử Lý Hình Ảnh</Styled>
                <Title>Smart Crop, Tagging</Title>
              </div>
            </div>
          </Link>
        </Col>
      </Row>
    </div>
      </div>
    </div>
  );
}

const Styled = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 240%;
  padding-left: 16px;
  padding-right: 16px;
  color: #000000D9;
`;

const Title = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 18px;
  font-size: 13px;
  color: #000000D9;
`

