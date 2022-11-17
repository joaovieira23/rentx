import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
    create({ name, driver_license, email, password }: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
};

export { IUsersRepository }