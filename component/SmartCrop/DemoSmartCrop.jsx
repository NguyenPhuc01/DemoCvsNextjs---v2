import { DeleteFilled, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Row, Upload, Button, Input, Space } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { isURL, trackTrialEvent } from "../utils";
import Result from "./Result";
import ViewApiButton from "../ViewApiButton";
import ReCAPTCHA from "react-google-recaptcha";

const sizeList = [
  {
    id: 1,
    size: {
      width: "100",
      height: "100",
    },
    text: "100x100",
  },
  {
    id: 2,
    size: {
      width: "210",
      height: "140",
    },
    text: "210x140",
  },
  {
    id: 3,
    size: {
      width: "750",
      height: "450",
    },
    text: "750x450",
  },
  {
    id: 4,
    size: {
      width: "1920",
      height: "1080",
    },
    text: "1920x1080",
  },
];

const url1 = "https://demo.computervision.com.vn/api/v2/smartcrop/crop_person";
const url2 = "https://demo.computervision.com.vn/api/v2/smartcrop/crop_image";

export default function DemoSmartCrop({ cropPerson, result, setResult }) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const recaptchaRef = React.useRef();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [size, setSize] = useState({ width: "100", height: "100" });
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

    if (file) {
      let formData = new FormData();
      formData.append("img", file);
      formData.append("recaptchaToken", recaptchaToken);

      setLoading(true);
      axios({
        method: "post",
        url: `${window.location.origin}/api/smart-crop?width=${
          size.width
        }&height=${size.height}&cropPerson=${Boolean(
          cropPerson
        )}&recaptchaToken=${recaptchaToken}`,
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
        url: `${window.location.origin}/api/smart-crop?url=${imageUrl}&width=${
          size.width
        }&height=${size.height}&cropPerson=${Boolean(
          cropPerson
        )}&recaptchaToken=${recaptchaToken}`,
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

  const onReset = () => {
    setFile(null);
    setResult(null);
    setImageUrl(null);
    setInput("");
    setToken("");
    recaptchaRef.current.reset();
  };

  const onDelete = (e) => {
    e.stopPropagation();
    onReset();
  };

  const setWidth = (e) => {
    const { value } = e.target;
    setSize((size) => ({ ...size, width: value }));
  };
  const setHeight = (e) => {
    const { value } = e.target;
    setSize((size) => ({ ...size, height: value }));
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
      <Col md={12} xs={24}>
        <Upload
          multiple={false}
          accept="image/*"
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
                  <img
                    src={file ? URL.createObjectURL(file) : imageUrl}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
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
          style={{ height: 46, marginTop: 8 }}
        />
        <div style={{ marginTop: 24, marginBottom: 4 }}>
          Chọn kích thước ảnh
        </div>
        <Space wrap>
          {sizeList.map((item) => {
            const { id, size: sizeItem, text } = item;
            return (
              <Button
                style={{ height: 40, borderRadius: "4px", width: 120 }}
                key={id}
                onClick={() => setSize(sizeItem)}
                type={
                  JSON.stringify(size) === JSON.stringify(sizeItem)
                    ? "primary"
                    : "default"
                }
              >
                {text}
              </Button>
            );
          })}
        </Space>
        <div style={{ marginTop: 24, marginBottom: 4 }}>
          Hoặc nhập kích thước mong muốn
        </div>
        <Space>
          <Input
            style={{ width: 120, height: 40, borderRadius: "4px" }}
            value={size.width}
            onChange={setWidth}
            placeholder="Chiều rộng"
          />
          <Input
            style={{ width: 120, height: 40, borderRadius: "4px" }}
            value={size.height}
            onChange={setHeight}
            placeholder="Chiều cao"
          />
        </Space>
        <ReCAPTCHA
          sitekey={recaptchaSiteKey}
          onChange={onChangeReCAPTCHA}
          ref={recaptchaRef}
          style={{ marginTop: 24 }}
          fallback={true}
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
            <Result result={result} cropPerson={cropPerson} />
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
