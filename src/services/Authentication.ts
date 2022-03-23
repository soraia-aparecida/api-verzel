import *  as  jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { AuthenticationData } from '../model/authenticationData'

dotenv.config()

const expiresIn = process.env.EXPIRES_IN

export class Authetication {
    public generateToken = (payload: AuthenticationData): string => {
        const token = jwt.sign(
            { id: payload.id, role: payload.role },
            process.env.JWT_KEY as string,
            { expiresIn }
        )
        return token
    }

    public getTokenData(token: string): AuthenticationData {
        const data = jwt.verify(token, process.env.JWT_KEY as string) as AuthenticationData
        return data

    }
}