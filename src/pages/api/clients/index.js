import Validation from "../../../models/Validation";
import dbConnection from "../../../service/dbConnection";

dbConnection();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const clients = await Validation.find({});
        res.status(200).json({ success: true, data: clients });
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, err });
      }

      break;

    case "POST":
      try {
        const client = await Validation.create(req.body);
        res.status(200).json({ success: true, data: client });
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, err });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
