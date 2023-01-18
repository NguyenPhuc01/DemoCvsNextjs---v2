import {
  DeleteFilled,
  LeftOutlined,
  LoadingOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Col, Row, Upload, Button, Input, Space, Menu } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { isURL, trackTrialEvent } from "../utils";
import Result from "./Result";
import ViewApiButton from "../ViewApiButton";
import PreviewPDF from "../DuLieuDangBang/PreviewPDF";
import HoSoNhanSuDemo from "./HoSoNhanSuDemo";
import HoSoTraiPhieuDemo from "./HoSoTraiPhieuDemo";
import ReCAPTCHA from "react-google-recaptcha";

const showMenuTypes = [
  "van-ban-tong-quat",
  "e-claim",
  "pvi-hoa-don",
  "hoa-don-xe",
  "so-khai-sinh",
  "hoa-don-full",
  "bao-gia-xe",
  "giay-ra-vien",
  "de-nghi-thanh-toan",
  "dang-ky-du-tuyen",
  "a4",
  "bang-tot-nghiep",
  "giay-khai-tu",
  "dang-ky-thue",
  "so-ho-khau",
  "ly-lich-tu-phap",
  "dcttcn",
  "uy-nhiem-chi",
  "dang-ky-bao-hiem",
  "the-tong-quat",
  "giay-nop-tien",
  "visa",
  "hop-dong-trai-phieu",
  "car-damage-assessment",
  "credit-card",
  "phieu-lao-dong",
  "de-nghi-vay-von",
  "can-cuoc-cong-dan",
  "CMND/CCCD",
  "ho-chieu-vn",
  "giay-phep-lai-xe-1",
  "giay-phep-lai-xe-2",
];

export default function DemoVanBan({ currentType, result, setResult }) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const recaptchaRef = React.useRef();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const isPDF = file?.type.includes("pdf");
  const [numPages, setNumPages] = useState(null);
  const isLargePDF = numPages > 3;

  useEffect(() => {
    setPageNumber(1);
  }, [file]);

  const [imageUrl, setImageUrl] = useState(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const [current, setCurrent] = useState("1");
  const [pageNumber, setPageNumber] = useState(1);
  const [token, setToken] = useState("");

  const hasData = file && result?.data;

  const onChangeFile = ({ file }) => {
    setFile(file);
  };

  const onChangeLink = (e) => {
    const { value } = e.target;
    setFile(null);
    setInput(value);
    if (value) {
      if (isURL(value)) {
        setImageUrl(value);
        setError(null);
      } else {
        setError("Link ảnh không hợp lệ");
      }
    } else {
      setError(null);
    }
  };

  const onSubmit = (recaptchaToken) => {
    if (!file && !imageUrl) return;
    trackTrialEvent(window.location.pathname);
    console.log("window", window.location.origin);
    if (file) {
      let formData = new FormData();
      if (currentType === "a4" || currentType === "cv") {
        formData.append("file", file);
      } else {
        formData.append("img", file);
      }
      formData.append("recaptchaToken", recaptchaToken);
      for (const pair of formData.entries()) {
      }
      setLoading(true);

      axios({
        method: "POST",
        url: `${window.location.origin}/api/ocr/v2?type=${currentType}&recaptchaToken=${recaptchaToken}`,
        data: formData,
      })
        .then((res) => {
          setResult(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(true);
      axios({
        method: "get",
        url: `${window.location.origin}/api/ocr/v2?type=${currentType}&img=${imageUrl}&recaptchaToken=${recaptchaToken}`,
      })
        .then((res) => {
          setResult(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const newSubmit = () => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(recaptchaSiteKey, { action: "submit" })
        .then((token) => {
          onSubmit(token);
        });
    });
  };

  const onReset = () => {
    setCurrent("1");
    setFile(null);
    setResult(null);
    setImageUrl(null);
    setInput("");
    setPageNumber(1);
    setToken("");
    recaptchaRef.current.reset();
  };

  const onDelete = (e) => {
    e.stopPropagation();
    onReset();
  };

  const onChangeReCAPTCHA = (token) => {
    setToken(token);
  };

  const onSubmitWithReCAPTCHA = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    onSubmit(recaptchaValue);
  };

  return (
    <>
      {currentType === "ho-so-nhan-su" ? (
        <HoSoNhanSuDemo
          result={result}
          file={file}
          onChangeFile={onChangeFile}
          imageUrl={imageUrl}
          loading={loading}
          input={input}
          onReset={onReset}
          onSubmit={onSubmit}
          error={error}
          onChangeLink={onChangeLink}
        />
      ) : currentType === "ho-so-trai-phieu" ? (
        <HoSoTraiPhieuDemo
          result={result}
          file={file}
          onChangeFile={onChangeFile}
          imageUrl={imageUrl}
          loading={loading}
          input={input}
          onReset={onReset}
          onSubmit={onSubmit}
          error={error}
          onChangeLink={onChangeLink}
        />
      ) : (
        <Row gutter={[30, 60]}>
          <Col md={12} xs={24} style={{ position: "relative" }}>
            <div style={{ height: "48px" }}>
              {(file || imageUrl) && (
                <>
                  {showMenuTypes.includes(currentType) && (
                    <div className="menusss">
                      <Menu
                        mode="horizontal"
                        onClick={(e) => setCurrent(e.key)}
                        selectedKeys={[current]}
                      >
                        <Menu.Item key="1">Ảnh gốc</Menu.Item>
                        {result?.data && (
                          <Menu.Item key="2">Ảnh đã xử lý</Menu.Item>
                        )}
                        {(result?.data?.[pageNumber - 1]?.info?.image_table ||
                          result?.data?.[pageNumber - 1]?.info?.image_drug) && (
                          <Menu.Item key="3">Ảnh bảng</Menu.Item>
                        )}
                      </Menu>
                    </div>
                  )}
                </>
              )}
            </div>
            <Upload
              multiple={false}
              accept="image/*, application/pdf"
              beforeUpload={() => false}
              showUploadList={false}
              onChange={onChangeFile}
              disabled={loading || hasData}
              // className="image-uploader"
            >
              {file || input ? (
                <div style={{ position: "relative" }}>
                  {error ? (
                    <div className="upload-area">{error}</div>
                  ) : (
                    <>
                      {current === "3" && (
                        <img
                          src={`data:image/png;base64,${
                            result.data[pageNumber - 1].info.image_table ||
                            result?.data?.[pageNumber - 1]?.info?.image_drug
                          }`}
                          alt="avatar"
                          style={{ width: "100%" }}
                        />
                      )}
                      {current === "2" && (
                        <>
                          {currentType === "a4" ? (
                            <img
                              src={`data:image/png;base64,${
                                result.data[pageNumber - 1]?.data?.image
                              }`}
                              alt="avatar"
                              style={{ width: "100%" }}
                            />
                          ) : (
                            <img
                              src={`data:image/png;base64,${
                                currentType === "van-ban-tong-quat"
                                  ? result.data[pageNumber - 1]?.image
                                  : currentType === "the-tong-quat"
                                  ? result.data[pageNumber - 1].img
                                  : currentType === "car-damage-assessment"
                                  ? result.image
                                  : currentType === "phieu-lao-dong"
                                  ? result.data?.info?.img
                                  : currentType === "de-nghi-vay-von" ||
                                    currentType === "CMND/CCCD" ||
                                    currentType === "giay-phep-lai-xe-1" ||
                                    currentType === "giay-phep-lai-xe-2" ||
                                    currentType === "ho-chieu-vn"
                                  ? result?.data?.info?.image
                                  : result.data[pageNumber - 1]?.info?.image
                              }`}
                              alt="avatar"
                              style={{ width: "100%" }}
                            />
                          )}
                          {(isPDF || result?.data?.length > 1) && (
                            <div className="page-controls">
                              <Button
                                icon={<LeftOutlined />}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPageNumber((page) => page - 1);
                                }}
                                disabled={pageNumber === 1}
                              />
                              <span onClick={(e) => e.stopPropagation()}>
                                {pageNumber} of{" "}
                                {numPages || result?.data?.length}
                              </span>
                              <Button
                                icon={<RightOutlined />}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPageNumber((page) => page + 1);
                                }}
                                disabled={pageNumber === numPages}
                              />
                            </div>
                          )}
                        </>
                      )}
                      {current === "1" &&
                        (isPDF ? (
                          <PreviewPDF
                            file={file}
                            numPages={numPages}
                            setNumPages={setNumPages}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                          />
                        ) : currentType === "sms-video" ? (
                          <div
                            style={{
                              height: 360,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {file.name}
                          </div>
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
                        onClick={onDelete}
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
              hl="vi"
            />
            <Button
              onClick={hasData ? onReset : onSubmitWithReCAPTCHA}
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
                <Result result={result} type={currentType} />
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
      )}
    </>
  );
}
