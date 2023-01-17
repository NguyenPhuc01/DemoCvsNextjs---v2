import React from "react";
// import styled from 'styled-components'

export default function Result({ result }) {
  const { result: data, errorCode, errorMessage } = result || {};

  return (
    <>
      {data ? (
        <>
          <div className="result-wrapper" style={{ textAlign: "center" }}>
            {data.map((name) => (
              <div key={name}>{name}</div>
            ))}
          </div>
        </>
      ) : (
        <div className="error">Không tìm thấy nội dung. Vui lòng thử lại!</div>
      )}
    </>
  );
}
