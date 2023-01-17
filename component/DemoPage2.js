import { Button, Space, Divider } from "antd";
import React, { useEffect, useState } from "react";
import DemoFaceMatching from "./FaceMatching/DemoFaceMatching";
import DemoFaceSearch from "./FaceSearch/DemoFaceSearch";
import DemoSmartCrop from "./SmartCrop/DemoSmartCrop";
import { useQueryParam, StringParam, withDefault } from "use-query-params";

const types = [
  { id: 1, name: "So khớp khuôn mặt", key: "face-matching" },
  { id: 2, name: "Tìm kiếm khuôn mặt", key: "face-search" },
  { id: 3, name: "Tạo ảnh đại diện", key: "tao-anh-dai-dien" },
];

export default function DemoPage2() {
  const [result, setResult] = useState(null);
  const [currentType, setCurrentType] = useQueryParam(
    "type",
    withDefault(StringParam, "face-matching")
  );

  const demoOptions = {
    "face-matching": <DemoFaceMatching result={result} setResult={setResult} />,
    "face-search": <DemoFaceSearch result={result} setResult={setResult} />,
    "tao-anh-dai-dien": (
      <DemoSmartCrop cropPerson={true} result={result} setResult={setResult} />
    ),
  };

  return (
    <div className="home-page-wrapper demo-wrapper">
      <div className="home-page demo">
        <div className="title-wrapper">Nhận diện khuôn mặt</div>
        <Divider
          style={{
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "22px",
            fontFamily: "SFProDisplay",
            color: "rgba(0, 0, 0, 0.85)",
          }}
          orientation="left"
        >
          Chọn sản phẩm
        </Divider>
        <div className="content-wrapper">
          <div className="content-layout">
            {/* <p style={{ width: 150 }}>Sản phẩm:</p> */}
            <Space
              size={[8, 8]}
              wrap
              align="center"
              style={{
                justifyContent: "center",
                width: "100%",
              }}
            >
              {types.map((type) => {
                const { id, name, key } = type;
                return (
                  <Button
                    key={id}
                    type={key === currentType ? "primary" : "default"}
                    onClick={() => {
                      setCurrentType(key);
                      setResult(null);
                    }}
                  >
                    {name}
                  </Button>
                );
              })}
            </Space>
          </div>
        </div>
        <Divider
          style={{
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "22px",
            fontFamily: "SFProDisplay",
            color: "rgba(0, 0, 0, 0.85)",
          }}
          orientation="left"
        >
          Tải ảnh từ máy của bạn lên
        </Divider>
        <div className="upload-wrapper">{demoOptions[currentType]}</div>
      </div>
    </div>
  );
}
