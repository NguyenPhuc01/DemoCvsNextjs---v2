import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import "./PreviewPDF.less";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
};

export default function PreviewPDF({
  file,
  numPages,
  setNumPages,
  pageNumber,
  setPageNumber,
}) {
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onPrev = (e) => {
    e.stopPropagation();
    setPageNumber((page) => page - 1);
  };

  const onNext = (e) => {
    e.stopPropagation();
    setPageNumber((page) => page + 1);
  };

  return (
    <div className="preview-pdf">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
      >
        <Page pageNumber={pageNumber} />
        <div className="page-controls">
          <Button
            icon={<LeftOutlined />}
            onClick={onPrev}
            disabled={pageNumber === 1}
          />
          <span onClick={(e) => e.stopPropagation()}>
            {pageNumber} of {numPages}
          </span>
          <Button
            icon={<RightOutlined />}
            onClick={onNext}
            disabled={pageNumber === numPages}
          />
        </div>
      </Document>
    </div>
  );
  return null;
}
