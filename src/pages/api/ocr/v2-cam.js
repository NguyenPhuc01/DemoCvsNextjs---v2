const axios = require("axios");
const FormData = require("form-data");

const urlOptions = {
  cambodia:
    "https://cambodia.computervision.com.vn/api/v2/ekyc/card?get_thumb=true",
  myanmar:
    "https://myanmar.computervision.com.vn/api/v2/ekyc/card?get_thumb=true",
  philippines:
    "https://demo.computervision.com.vn/api/v2/ocr/philippines?get_thumb=true",
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

export default async function handler(req, res) {
  const type = req.query.type;
  const url = urlOptions[type];

  if (req.method === `POST`) {
    const file = req.files[0];
    let form = new FormData();
    form.append("img", file.buffer, file.originalname);

    const recaptchaValidationResult = await recaptchaValidation({
      recaptchaToken: req.body.recaptchaToken,
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
          username: process.env.GATSBY_API_USERNAME2,
          password: process.env.GATSBY_API_PASSWORD2,
        },
        data: form,
        headers: form.getHeaders(),
      })
        .then((response) => {
          res.json(response.data);
        })
        .catch((err) => {
          delete err.config;
          res.status(400).send(err);
          // console.log(err)
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
          username: process.env.GATSBY_API_USERNAME2,
          password: process.env.GATSBY_API_PASSWORD2,
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
          // console.log(err)
        });
    }
  }
}
