import { Router } from "express";
import path from "path";

const router = Router();

router.get("/user", (_, res) => {
  res.sendFile(path.join(__dirname + "/../public/date-picker.html"));
});

router.post("/user", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

export default router;
