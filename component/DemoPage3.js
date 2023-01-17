import { Button, Space, Divider } from "antd";
import React, { useEffect, useState } from "react";
import DemoSmartCrop from "./SmartCrop/DemoSmartCrop";
import DemoTagging from "./Tagging/DemoTagging";
import { useQueryParam, StringParam, withDefault } from "use-query-params";
import DemoVanBan from "./VanBan/DemoVanBan";

const types = [
  { id: 3, name: "Giám định tổn thất", key: "car-damage-assessment" },
  { id: 1, name: "Smart crop", key: "smart-crop" },
  { id: 2, name: "Tagging", key: "tagging" },
];

export default function DemoPage3() {
  const [result, setResult] = useState(null);
  const [currentType, setCurrentType] = useQueryParam(
    "type",
    withDefault(StringParam, "car-damage-assessment")
  );

  const demoOptions = {
    "car-damage-assessment": (
      <DemoVanBan
        currentType={"car-damage-assessment"}
        result={result}
        setResult={setResult}
      />
    ),
    "smart-crop": <DemoSmartCrop result={result} setResult={setResult} />,
    tagging: <DemoTagging result={result} setResult={setResult} />,
  };

  return (
    <div className="home-page-wrapper demo-wrapper">
      <div className="home-page demo">
        <div className="title-wrapper">Xử lý hình ảnh</div>
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
