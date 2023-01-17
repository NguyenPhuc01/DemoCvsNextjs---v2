import { Col, Row } from "antd";
import Head from "next/head";
import Frame6 from "../../images/Frame6.png";
import Frame7 from "../../images/Frame7.png";
import Frame8 from "../../images/Frame8.png";
import Frame9 from "../../images/Frame9.png";
import Link from "next/link";
import CardHome from "../../component/cardHome";
export default function Home() {
  // console.log("sitekey ", process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  return (
    <>
      <Head>
        <title>Computer vision Việt Nam</title>
      </Head>
      <h2 style={{ fontWeight: "bold" }}>Trang chủ</h2>
      <div>
        <Row gutter={[30, 16]}>
          <Col xs={24} sm={12} md={6}>
            {" "}
            <Link href={"/ocr"}>
              <CardHome
                src={Frame6}
                title="Nhận diện ký tự"
                description="Giấy tờ tùy thân, Giấy tờ xe, Hóa đơn, Dữ liệu bảng, ..."
              />
            </Link>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Link href={"/facial-recognition"}>
              <CardHome
                src={Frame7}
                title="Nhận Diện Khuôn Mặt"
                description="So khớp khuôn mặt, Tìm kiếm khuôn mặt, Tạo ảnh đại diện"
              />
            </Link>
          </Col>
          <Col xs={24} sm={12} md={6}>
            {" "}
            <Link href={"/ekyc"}>
              <CardHome
                src={Frame9}
                title="eKYC"
                description="Định danh khách hàng trực tuyến"
              />
            </Link>
          </Col>
          <Col xs={24} sm={12} md={6}>
            {" "}
            <Link href={"/image-recognition"}>
              <CardHome
                src={Frame8}
                title="Xử Lý Hình Ảnh"
                description="Smart Crop, Tagging"
              />
            </Link>
          </Col>
        </Row>
      </div>
    </>
  );
}
