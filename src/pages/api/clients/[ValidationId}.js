import Validation from "../../../models/Validation";
import dbConnection from "../../../service/dbConnection";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  const { ValidationID } = req.query;
  switch (method) {
    case "PUT":
      try {
        const { firstName, lastName, email, phone, address} = req.body;
        if (!firstName && !email) return "inavalid data";
        await Validation.updateOne({ _id: ValidationID }, {firstName, lastName, email, phone, address});
        res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;

    case "DELETE":
      try {
        await Validation.deleteOne({ _id: ValidationID });
        res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;
  }
};
