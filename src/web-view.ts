import { Request, Response, Router } from "express";
import path from "path";

class WebViewController {
  public router;

  constructor() {
    this.router = Router();
  }

  public getUsers = (_: Request, res: Response) => {
    res.sendFile(path.join(__dirname + "/../public/user.html"));
  };

  public setRoutes = () => {
    this.router.get("/user", this.getUsers);
  };
}

export const webViewController = new WebViewController();
