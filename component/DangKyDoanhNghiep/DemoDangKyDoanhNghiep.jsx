import { DeleteFilled, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Row, Upload, Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { isURL, trackTrialEvent } from "../utils";
import Result from "./Result";
import ViewApiButton from "../ViewApiButton";
import PreviewPDF from "../DuLieuDangBang/PreviewPDF";
import ReCAPTCHA from "react-google-recaptcha";

const url =
  "https://demo.computervision.com.vn/api/v2/ocr/document/business_registration?get_thumb=true";

export default function DemoDangKyDoanhNghiep({ result, setResult }) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const recaptchaRef = React.useRef();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const isPDF = file?.type.includes("pdf");
  const [numPages, setNumPages] = useState(null);
  const isLargePDF = numPages > 3;

  const [imageUrl, setImageUrl] = useState(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setPageNumber(1);
  }, [file]);

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
        url: `${window.location.origin}/api/ocr/v2?type=dang-ky-doanh-nghiep`,
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
        url: `${window.location.origin}/api/ocr/v2?type=dang-ky-doanh-nghiep&recaptchaToken=${recaptchaToken}`,
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
    <Row gutter={[30, 60]}>
      <Col md={12} xs={24}>
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
                  {isPDF ? (
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
                  )}
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
          style={{ height: 46, marginTop: isPDF ? 56 : 8 }}
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
            <Result result={result} />
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
