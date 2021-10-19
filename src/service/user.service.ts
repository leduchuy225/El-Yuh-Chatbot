import { UserEntity } from "./../entities/user.entity";
import { UserRepository } from "./../repository/user.repository";
import { getConnection } from "typeorm";

export class UserService {
  private userRepository!: UserRepository;

  constructor() {
    this.getConnection();
  }

  getConnection = () => {
    this.userRepository = getConnection().getCustomRepository(UserRepository);
  };

  creat = async (user: UserEntity) => {
    const newUser = await this.userRepository.save(user);
    return newUser;
  };
}
