import formidable from "formidable";
import multer from "multer";
const axios = require("axios");
import fs from "fs";
const FormData = require("form-data");

const urlOptions = {
  "van-ban-tong-quat":
    "https://demo.computervision.com.vn/api/v2/ocr/document/general?get_thumb=true",
  "CMND/CCCD":
    "https://demo.computervision.com.vn/api/v3/ekyc/card?get_thumb=true",
  "giay-phep-lai-xe-1":
    "https://demo.computervision.com.vn/api/v3/ekyc/card?get_thumb=true",
  "giay-phep-lai-xe-2":
    "https://demo.computervision.com.vn/api/v3/ekyc/card?get_thumb=true",
  "ho-chieu-vn":
    "https://demo.computervision.com.vn/api/v3/ekyc/card?get_thumb=true",
  "hoa-don-xe":
    "https://demo.computervision.com.vn/api/v2/ocr/document/invoice_vehicle?get_thumb=true",
  "hoa-don-vat":
    "https://demo.computervision.com.vn/api/v2/ocr/document/pvi_invoice?get_thumb=false",
  "hoa-don":
    "https://demo.computervision.com.vn/api/v2/ocr/document/invoice_vehicle?get_thumb=true",
  "bang-ke":
    "https://demo.computervision.com.vn/api/v2/ocr/document/list_expense?get_thumb=false",
  "phieu-kham-benh":
    "https://demo.computervision.com.vn/api/v2/ocr/document/examination_form?get_thumb=false",
  "boi-thuong-bao-hiem":
    "https://demo.computervision.com.vn/api/v2/ocr/document/claim_form?get_thumb=false",
  "e-claim":
    "https://demo.computervision.com.vn/api/v2/ocr/bvcareclaim?get_thumb=true",
  "pvi-hoa-don":
    "https://demo.computervision.com.vn/api/v2/ocr/document/pvi_invoice?get_thumb=true",
  "so-khai-sinh":
    "https://demo.computervision.com.vn/api/v2/nlpextract/civil_registration?get_thumb=true",
  "hoa-don-full":
    "https://demo.computervision.com.vn/api/v2/ocr/document/invoice_full?get_thumb=true",
  "bao-gia-xe":
    "https://demo.computervision.com.vn/api/v2/ocr/document/price_quotation?get_thumb=true",
  "giay-ra-vien":
    "https://demo.computervision.com.vn/api/v2/ocr/document/hospital_discharge_paper?get_thumb=true",
  "de-nghi-thanh-toan":
    "https://demo.computervision.com.vn/api/v2/nlpextract/denghithanhtoan?get_thumb=true",
  "dang-ky-du-tuyen":
    "https://demo.computervision.com.vn/api/v2/nlpextract/dangkydutuyen?get_thumb=true",
  a4: "https://demo.computervision.com.vn/backend/api/v1/request/ocr/v1/get_infor?get_thumb=true",
  "bang-tot-nghiep":
    "https://demo.computervision.com.vn/api/v2/nlpextract/bangtotnghiep?get_thumb=true",
  "giay-khai-tu":
    "https://demo.computervision.com.vn/api/v2/nlpextract/khaitu?get_thumb=true",
  "dang-ky-thue":
    "https://demo.computervision.com.vn/api/v2/nlpextract/dangkythue?get_thumb=true",
  "so-ho-khau":
    "https://demo.computervision.com.vn/api/v2/ocr/shk?get_thumb=true",
  "ly-lich-tu-phap":
    "https://demo.computervision.com.vn/api/v2/nlpextract/lylichtuphap?get_thumb=true",
  dcttcn:
    "https://demo.computervision.com.vn/api/v2/nlpextract/dcttcn?get_thumb=true",
  "uy-nhiem-chi":
    "https://demo.computervision.com.vn/api/v2/nlpextract/giay_uynhiemchi?get_thumb=true",

  "ho-so-nhan-su":
    "https://demo.computervision.com.vn/api/v2/ocr/employee_profile?get_thumb=true",
  "dang-ky-bao-hiem":
    "https://demo.computervision.com.vn/api/v2/ocr/ycbh?get_thumb=true",
  "the-tong-quat":
    "https://demo.computervision.com.vn/api/v2/ocr/card_general?get_thumb=true",
  cv: "https://demo.computervision.com.vn/api/v2/cv_parser/cv_file_parser?get_thumb=true",
  "giay-nop-tien":
    "https://demo.computervision.com.vn/api/v2/nlpextract/giaynoptien?get_thumb=true",
  visa: "https://demo.computervision.com.vn/api/v2/nlpextract/visa?get_thumb=true",
  "hop-dong-trai-phieu":
    "https://demo.computervision.com.vn/api/v2/nlpextract/hd_mua_ban_trai_phieu?get_thumb=true",
  "ho-so-trai-phieu":
    "https://demo.computervision.com.vn/api/v2/ocr/document/bond_records?get_thumb=true",
  "sms-video":
    "https://demo.computervision.com.vn/api/v2/ocr/sms_video?get_thumb=true",
  "credit-card":
    "https://demo.computervision.com.vn/api/v2/ocr/document/credit_card?get_thumb=true",
  "so-do":
    "https://demo.computervision.com.vn/api/v2/ocr/document/land_certificate?get_thumb=true",
  "phieu-lao-dong":
    "https://demo.computervision.com.vn/api/v2/ocr/document/phieu_lao_dong?get_thumb=false",
  "de-nghi-vay-von":
    "https://demo.computervision.com.vn/api/v2/ocr/document/dich_vu_vay_von?get_thumb=false",

  blx: "https://demo.computervision.com.vn/api/v2/ocr/driving_license?get_thumb=true",
  bsx: "https://demo.computervision.com.vn/api/v2/ocr/vehicle_plate?get_thumb=true",
  "dang-kiem-xe":
    "https://demo.computervision.com.vn/api/v2/ocr/vehicle_inspection?get_thumb=true",
  "dang-ky-doanh-nghiep":
    "https://demo.computervision.com.vn/api/v2/ocr/document/business_registration?get_thumb=true",
  "dang-ky-xe":
    "https://demo.computervision.com.vn/api/v2/ocr/vehicle_registration?get_thumb=true",

  "bang-diem":
    "https://demo.computervision.com.vn/api/v2/ocr/document/transcript?get_thumb=false",
  "sao-ke-ngan-hang":
    "https://demo.computervision.com.vn/api/v2/ocr/document/bank_statement?get_thumb=false",
  "bang-ke-vien-phi":
    "https://demo.computervision.com.vn/api/v2/ocr/document/hospital_fee?get_thumb=false",
  "bao-cao-tai-chinh":
    "https://demo.computervision.com.vn/api/v2/ocr/document/financial_report?get_thumb=true",
  // 'tong-quat': 'https://demo.computervision.com.vn/api/v2/ocr/document/table_excel?get_thumb=false',
  "bang-tong-quat":
    "https://demo.computervision.com.vn/api/v2/ocr/document/get_table?get_thumb=true",

  "giay-khai-sinh":
    "https://demo.computervision.com.vn/api/v2/ocr/birth_certificate?get_thumb=true",
  passport:
    "https://demo.computervision.com.vn/api/v2/ocr/passport?get_thumb=true",

  "car-damage-assessment":
    "https://demo.computervision.com.vn/api/v2/vision/car_damage_assessment?get_thumb=true",
};

const recaptchaValidation = async ({ recaptchaToken }) => {
  try {
    const response = await axios({
      url: "https://www.google.com/recaptcha/api/siteverify",
      method: "POST",
      params: {
        secret: process.env.GATSBY_RECAPTCHA_V3_SECRET_KEY,
        response: recaptchaToken,
      },
    });
    console.log("response.data: ", response.data);
    return {
      success: response.data.success,
      message: response.data["error-codes"] || "error",
      score: response.data.score,
    };
  } catch (error) {
    let message;
    if (error.response) {
      message = `reCAPTCHA server responded with non 2xx code: ${error.response.data}`;
    } else if (error.request) {
      message = `No reCAPTCHA response received: ${error.request}`;
    } else {
      message = `Error setting up reCAPTCHA response: ${error.message}`;
    }
    return { success: false, message };
  }
};

async function parseFormData(req, res) {
  const storage = multer.memoryStorage();
  const multerUpload = multer({ storage });
  const multerFiles = multerUpload.any();
  await new Promise((resolve, reject) => {
    multerFiles(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
  return {
    fields: req.body,
    files: req.files,
  };
}
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const result = await parseFormData(req, res);

  const type = req.query.type;
  const url = urlOptions[type];

  if (req.method === `POST`) {
    const form = new FormData();
    const file = result?.files[0];
    form.append("img", file.buffer, file.originalname);

    const recaptchaValidationResult = await recaptchaValidation({
      recaptchaToken: req.query.recaptchaToken,
    });

    if (
      !recaptchaValidationResult.success ||
      recaptchaValidationResult.score < 0.5
    ) {
      res.status(400).send(recaptchaValidationResult.message);
    } else {
      axios({
        method: "POST",
        url: `${url}&format_type=file`,
        auth: {
          username: process.env.GATSBY_API_USERNAME,
          password: process.env.GATSBY_API_PASSWORD,
        },
        data: form,
        headers: form.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      })
        .then((response) => {
          res.json(response.data);
        })
        .catch((err) => {
          delete err.config;
          res.status(400).send(err);
        });
    }
  }

  if (req.method === `GET`) {
    const img = req.query.img;

    const recaptchaValidationResult = await recaptchaValidation({
      recaptchaToken: req.query.recaptchaToken,
    });

    if (
      !recaptchaValidationResult.success ||
      recaptchaValidationResult.score < 0.5
    ) {
      res.status(400).send(recaptchaValidationResult.message);
    } else {
      axios({
        method: "GET",
        url: `${url}&format_type=url&img=${encodeURI(img)}`,
        auth: {
          username: process.env.GATSBY_API_USERNAME,
          password: process.env.GATSBY_API_PASSWORD,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => {
          res.json(response.data);
        })
        .catch((err) => {
          delete err.config;
          res.status(400).send(err);
        });
    }
  }
}
