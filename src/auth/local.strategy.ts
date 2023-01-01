import { Injectable,BadRequestException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import {Strategy } from 'passport-local';
import * as argon2 from "argon2";
import { User } from "src/typeorm/entities/User";
import { Repository } from "typeorm";
import { UsersService } from "../users/services/users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    //
    // (@InjectRepository(User) private userRepository: Repository<User>

    constructor(private userService: UsersService) {
        super()
    }

    async validate(username: string, password: string): Promise<any> {
        // validate user from DB
        const dbUser = await this.userService.findUserByUsername({username});
        if(!dbUser)
            throw new BadRequestException('invalid user !!! ');

        const isVerified = await argon2.verify(dbUser.password , password);
        if(!isVerified)
            throw new BadRequestException('invalid credentials');
        else 
            return dbUser;
    }
}