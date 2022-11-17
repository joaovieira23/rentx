import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("Token missing", 401);
    };

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, 'ec8225af0776b3ee5a28678986159226') as IPayload;

        // Verificar se esse usuário existe no banco de dados

        const usersRepository = new UsersRepository();

        const user = usersRepository.findById(user_id);

        if(!user) {
            throw new AppError("User does not exists!", 401);
        };

        next();
    } catch (e) {
        throw new AppError("Invalid token!", 401);
    }
};