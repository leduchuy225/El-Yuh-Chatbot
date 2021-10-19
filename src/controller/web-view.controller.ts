import { UserService } from "./../service/user.service";
import { UserEntity } from "./../entities/user.entity";
import { Request, Response, Router } from "express";
import path from "path";

export class WebViewController {
  public router;
  private userService;

  constructor() {
    this.router = Router();
    this.userService = new UserService();
    this.setRoutes();
  }

  getUserInformationForm = (_: Request, res: Response) => {
    res.sendFile(path.join(__dirname + "../../../public/user.html"));
  };

  postUserInfomation = async (req: Request, res: Response) => {
    const user = req.body as UserEntity;
    const newUser = await this.userService.creat(user);

    console.log(newUser);
    res.send(newUser);
  };

  setRoutes = () => {
    this.router.get("/user", this.getUserInformationForm);
    this.router.post("/user", this.postUserInfomation);
  };
}
