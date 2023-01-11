import { AppDataSource } from "../../data-source";
import jwt from "jsonwebtoken";
import { ICreateSessionRequest } from "../../interfaces";
import { User } from "../../entities/users.entity"
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import "dotenv/config"

const createSessionService = async ( userData: ICreateSessionRequest ): Promise<string> => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({
        email: userData.email
    })

    const passwordMatch = await compare(userData.password, user.password)

    if(!passwordMatch) {
        throw new AppError("invalid email/password", 403)
    }

    const token = jwt.sign(
        {
            id: user.id,
            isEmployee: user.isEmployee
        },
        process.env.SECRET_KEY,
        {
            subject: user.id,
            expiresIn: "24h"
        }
    )

    return token
}

export { createSessionService };