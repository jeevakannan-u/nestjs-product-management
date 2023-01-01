import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExipration: false,
            secretOrKey: 'test' 
        })
    }

    async validate(userObject, cb):Promise<any> {
        // check if user is active or not
        // other user level checks from Payload
        let isValid =false;
        if(Number(userObject.user))
            isValid = true;
        return isValid;
    }
}