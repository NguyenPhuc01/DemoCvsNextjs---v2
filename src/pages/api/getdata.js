import mysql from "mysql2/promise";

import { v4 as uuidv4 } from "uuid";
export default async function hanlerPostData(req, res) {
  const resultData = req.body;
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  const id = uuidv4();
  try {
    const query = `select Email from mydata.datauserlogin where Email='${req.body.email}'`;
    const [data] = await db.execute(query);
    if (data.length > 0) {
      console.log("user đã đăng nhập trước đó");
    } else {
      const queryData = `INSERT INTO mydata.datauserlogin (Id, Image, FullName,Email)
      VALUES ('${id}', '${resultData.image}', '${resultData.name}','${resultData.email}')`;
      const [executeData] = await db.execute(queryData);
      res.status(200).json({ result: executeData });
    }
  } catch (error) {
    console.log("error", error);
  }
}
