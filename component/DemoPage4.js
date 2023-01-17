import { Button, Space, Divider } from "antd";
import React, { useEffect, useState } from "react";
import DemoFaceMatching from "./FaceMatching/DemoFaceMatching";
import DemoCMND from "./OCR/DemoCMND";
import DemoVanBan from "../component/VanBan/DemoVanBan";

import {
  useQueryParam,
  StringParam,
  withDefault,
  useQueryParams,
} from "use-query-params";

const types = [
  { id: 1, name: "Nhận diện GTTT", key: "CMND/CCCD" },
  { id: 2, name: "So khớp khuôn mặt", key: "face-matching" },
];

export default function DemoPage2() {
  const [result, setResult] = useState(null);
  const [currentType, setCurrentType] = useQueryParam(
    "type",
    withDefault(StringParam, "CMND/CCCD")
  );
  const [query, setQuery] = useQueryParams({
    tab: withDefault(StringParam, "id_card"),
    type: withDefault(StringParam, "CMND/CCCD"),
  });
  const { tab, type } = query;
  const demoOptions = {
    "CMND/CCCD": (
      <DemoVanBan currentType={type} result={result} setResult={setResult} />
    ),
    "face-matching": <DemoFaceMatching result={result} setResult={setResult} />,
  };

  return (
    <div className="home-page-wrapper demo-wrapper">
      <div className="home-page demo">
        <div className="title-wrapper">eKYC</div>
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
