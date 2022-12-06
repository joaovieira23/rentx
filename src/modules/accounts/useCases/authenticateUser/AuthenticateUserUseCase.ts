import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";


interface IRequest {
    email: string;
    password: string;
};

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
};

class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // Verificar se o usuário existe
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError("Email or password incorret!");
        };

        // Verificar se a senha está correta

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new AppError("Email or password incorret!");
        };

        // Gerar o JWT

        const token = sign({}, "ec8225af0776b3ee5a28678986159226", {
            subject: user.id,
            expiresIn: "1d",
        });

       const tokenReturn: IResponse = {
            user: {
               name: user.name,
               email: user.email
            },
            token
       }; 

        return tokenReturn;
    }
};

export { AuthenticateUserUseCase };