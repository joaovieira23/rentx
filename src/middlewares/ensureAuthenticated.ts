import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new Error("Token missing");
    };

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, 'ec8225af0776b3ee5a28678986159226') as IPayload;

        // Verificar se esse usuário existe no banco de dados

        const usersRepository = new UsersRepository();

        const user = usersRepository.findById(user_id);

        if(!user) {
            throw new Error("User does not exists!");
        };

        next();
    } catch (e) {
        throw new Error("Invalid token!");
    }
};