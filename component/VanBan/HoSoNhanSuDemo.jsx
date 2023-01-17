import {
  DeleteFilled,
  LeftOutlined,
  LoadingOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Col, Row, Upload, Button, Input, Space, Menu } from "antd";
import React, { useState, useEffect } from "react";
import ViewApiButton from "../ViewApiButton";
import PreviewPDF from "../DuLieuDangBang/PreviewPDF";
import HoSoNhanSuResult from "./HoSoNhanSuResult";
import ReCAPTCHA from "react-google-recaptcha";

export default function HoSoNhanSuDemo({
  result,
  onChangeFile,
  file,
  imageUrl,
  loading,
  input,
  onReset,
  onSubmit,
  error,
  onChangeLink,
}) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const recaptchaRef = React.useRef();
  const isPDF = file?.type.includes("pdf");
  const hasData = file && result?.data;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [current, setCurrent] = useState("origin");
  const [token, setToken] = useState("");

  const reset = () => {
    setNumPages(null);
    setPageNumber(1);
    setCurrent("origin");
    onReset();
  };

  const imageOptions = {
    id_card: <AnhGiayToTuyThan data={result?.data[current]} />,
    curriculum_vitae: <AnhSoYeuLyLich data={result?.data[current]} />,
    registration_book: <AnhSoHoKhau data={result?.data[current]} />,
    academic_degree: <AnhBangDaiHoc data={result?.data[current]} />,
    birth_certificate: <AnhGiayKhaiSinh data={result?.data[current]} />,
    health_certification: <AnhGiayKhamSucKhoe data={result?.data[current]} />,
    confirm_residence: <AnhXacNhanThongTinCuTru data={result?.data[current]} />,
    origin: null,
  };

  const onChangeReCAPTCHA = (token) => {
    setToken(token);
  };

  const onSubmitWithReCAPTCHA = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    onSubmit(recaptchaValue);
  };

  return (
    <Row gutter={[30, 60]}>
      <Col md={12} xs={24} style={{ position: "relative" }}>
        {(file || imageUrl) && (
          <>
            <div className="menu">
              <Menu
                mode="horizontal"
                onClick={(e) => setCurrent(e.key)}
                selectedKeys={[current]}
              >
                <Menu.Item key="origin">Ảnh gốc</Menu.Item>
                {result?.data?.id_card.length > 0 && (
                  <Menu.Item key="id_card">Ảnh GTTT</Menu.Item>
                )}
                {result?.data?.curriculum_vitae.length > 0 && (
                  <Menu.Item key="curriculum_vitae">
                    Ảnh sơ yếu lý lịch
                  </Menu.Item>
                )}
                {result?.data?.registration_book.length > 0 && (
                  <Menu.Item key="registration_book">Ảnh sổ hộ khẩu</Menu.Item>
                )}
                {result?.data?.academic_degree.length > 0 && (
                  <Menu.Item key="academic_degree">Ảnh bằng đại học</Menu.Item>
                )}
                {result?.data?.birth_certificate.length > 0 && (
                  <Menu.Item key="birth_certificate">
                    Ảnh giấy khai sinh
                  </Menu.Item>
                )}
                {result?.data?.health_certification.length > 0 && (
                  <Menu.Item key="health_certification">
                    Ảnh giấy khám sức khỏe
                  </Menu.Item>
                )}
                {result?.data?.confirm_residence.length > 0 && (
                  <Menu.Item key="confirm_residence">
                    Ảnh xác nhận thông tin cư trú
                  </Menu.Item>
                )}
              </Menu>
            </div>
          </>
        )}
        <Upload
          multiple={false}
          accept="image/*, application/pdf"
          beforeUpload={() => false}
          showUploadList={false}
          onChange={onChangeFile}
          disabled={loading || hasData}
          className="image-uploader"
        >
          {file || input ? (
            <div style={{ position: "relative" }}>
              {error ? (
                <div className="upload-area">{error}</div>
              ) : (
                <>
                  <>{imageOptions[current]}</>
                  {current === "origin" &&
                    (isPDF ? (
                      <PreviewPDF
                        file={file}
                        numPages={numPages}
                        setNumPages={setNumPages}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                      />
                    ) : (
                      <img
                        src={file ? URL.createObjectURL(file) : imageUrl}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ))}

                  <Button
                    icon={<DeleteFilled />}
                    style={{ position: "absolute", top: 0, right: 0 }}
                    type="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      reset();
                    }}
                  />
                </>
              )}
            </div>
          ) : (
            <div className="upload-area">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
        <Input
          value={input}
          onChange={onChangeLink}
          placeholder="Hoặc nhập link ảnh"
          style={{
            height: 46,
            marginTop: isPDF || result?.data?.length > 1 ? 56 : 8,
          }}
        />

        <ReCAPTCHA
          sitekey={recaptchaSiteKey}
          onChange={onChangeReCAPTCHA}
          ref={recaptchaRef}
          style={{ marginTop: 24 }}
          fallback={true}
          hl="vi"
        />
        <Button
          onClick={hasData ? reset : onSubmitWithReCAPTCHA}
          loading={loading}
          type="primary"
          block
          style={{ height: 48, marginTop: 24 }}
          disabled={hasData ? false : !token}
        >
          {hasData ? "Thử lại" : "XỬ LÝ"}
        </Button>
      </Col>
      <Col md={12} xs={24}>
        <div className="demo-result">
          {result ? (
            <>
              <HoSoNhanSuResult result={result} />
            </>
          ) : (
            <div className="note">
              {loading ? (
                <LoadingOutlined style={{ fontSize: 40 }} />
              ) : (
                'Vui lòng thêm ảnh và nhấn "Xử lý" để trải nghiệm dịch vụ'
              )}
            </div>
          )}
        </div>
        <ViewApiButton />
      </Col>
    </Row>
  );
}

function AnhGiayToTuyThan({ data = [] }) {
  const [page, setPage] = useState(0);
  const numPages = data.length;

  return (
    <>
      <img
        src={`data:image/png;base64,${data[page].info.image_front}`}
        alt="avatar"
        style={{ width: "100%" }}
      />
      <img
        src={`data:image/png;base64,${data[page].info.image_back}`}
        alt="avatar"
        style={{ width: "100%" }}
      />
      {data?.length > 1 && (
        <div className="page-controls">
          <Button
            icon={<LeftOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setPage((page) => page - 1);
            }}
            disabled={page === 0}
          />
          <span onClick={(e) => e.stopPropagation()}>
            {page + 1} of {numPages}
          </span>
          <Button
            icon={<RightOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setPage((page) => page + 1);
            }}
            disabled={page === numPages - 1}
          />
        </div>
      )}
    </>
  );
}

function AnhBangDaiHoc({ data = [] }) {
  const [page, setPage] = useState(0);
  const numPages = data.length;

  return (
    <>
      <img
        src={`data:image/png;base64,${data[page].info.image}`}
        alt="avatar"
        style={{ width: "100%" }}
      />
      {data?.length > 1 && (
        <div className="page-controls">
          <Button
            icon={<LeftOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setPage((page) => page - 1);
            }}
            disabled={page === 0}
          />
          <span onClick={(e) => e.stopPropagation()}>
            {page + 1} of {numPages}
          </span>
          <Button
            icon={<RightOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setPage((page) => page + 1);
            }}
            disabled={page === numPages - 1}
          />
        </div>
      )}
    </>
  );
}

function AnhGiayKhaiSinh({ data = [] }) {
  const [page, setPage] = useState(0);
  const numPages = data.length;

  return (
    <>
      <img
        src={`data:image/png;base64,${data[page].info.image}`}
        alt="avatar"
        style={{ width: "100%" }}
      />
      {data?.length > 1 && (
        <div className="page-controls">
          <Button
            icon={<LeftOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setPage((page) => page - 1);
            }}
            disabled={page === 0}
          />
          <span onClick={(e) => e.stopPropagation()}>
            {page + 1} of {numPages}
          </span>
          <Button
            icon={<RightOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setPage((page) => page + 1);
            }}
            disabled={page === numPages - 1}
          />
        </div>
      )}
    </>
  );
}

function AnhGiayKhamSucKhoe({ data = [] }) {
  const [page, setPage] = useState(0);
  const numPages = 3;

  return (
    <>
      <img
        src={`data:image/png;base64,${data[0]["info"][`image_${page}`]}`}
        alt="avatar"
        style={{ width: "100%" }}
      />
      {
        <div className="page-controls">
          <Button
            icon={<LeftOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setPage((page) => page - 1);
            }}
            disabled={page === 0}
          />
          <span onClick={(e) => e.stopPropagation()}>
            {page + 1} of {numPages}
          </span>
          <Button
            icon={<RightOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setPage((page) => page + 1);
            }}
            disabled={page === numPages - 1}
          />
        </div>
      }
    </>
  );
}

function AnhSoYeuLyLich({ data = [] }) {
  const [page, setPage] = useState(0);
  const numPages = 4;

  return (
    <>
      <img
        src={`data:image/png;base64,${data[0]["info"][`image_${page}`]}`}
        alt="avatar"
        style={{ width: "100%" }}
      />
      {
        <div className="page-controls">
          <Button
            icon={<LeftOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setPage((page) => page - 1);
            }}
            disabled={page === 0}
          />
          <span onClick={(e) => e.stopPropagation()}>
            {page + 1} of {numPages}
          </span>
          <Button
            icon={<RightOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setPage((page) => page + 1);
            }}
            disabled={page === numPages - 1}
          />
        </div>
      }
    </>
  );
}

function AnhSoHoKhau({ data = [] }) {
  const [page, setPage] = useState(0);
  const { image, member = [] } = data[0]?.info || {};
  const images = [image, ...member.map((m) => m.image_member)];
  const numPages = images.length;

  return (
    <>
      <img
        src={`data:image/png;base64,${images[page]}`}
        alt="avatar"
        style={{ width: "100%" }}
      />
      {
        <div className="page-controls">
          <Button
            icon={<LeftOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setPage((page) => page - 1);
            }}
            disabled={page === 0}
          />
          <span onClick={(e) => e.stopPropagation()}>
            {page + 1} of {numPages}
          </span>
          <Button
            icon={<RightOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setPage((page) => page + 1);
            }}
            disabled={page === numPages - 1}
          />
        </div>
      }
    </>
  );
}

function AnhXacNhanThongTinCuTru({ data = [] }) {
  const [page, setPage] = useState(0);
  const { image, image_member } = data[0]?.info || {};
  const images = [image, image_member];
  const numPages = images.length;

  return (
    <>
      <img
        src={`data:image/png;base64,${images[page]}`}
        alt="avatar"
        style={{ width: "100%" }}
      />
      {
        <div className="page-controls">
          <Button
            icon={<LeftOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setPage((page) => page - 1);
            }}
            disabled={page === 0}
          />
          <span onClick={(e) => e.stopPropagation()}>
            {page + 1} of {numPages}
          </span>
          <Button
            icon={<RightOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setPage((page) => page + 1);
            }}
            disabled={page === numPages - 1}
          />
        </div>
      }
    </>
  );
}
