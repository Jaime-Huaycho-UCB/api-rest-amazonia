import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { MyJwtConfig } from 'src/infrastructure/config/services/jwt.config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { MyUnauthorizedException } from 'src/shared/exceptions/my-unauthorized.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly jwtConfig: MyJwtConfig) {
        const config = jwtConfig.get();
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.secret,
        });
    }

    validate(payload: JwtPayload): JwtPayload {
        if (payload.fechaExpiracion) {
            const ahora = new Date();
            const expiracion = new Date(payload.fechaExpiracion);
            if (ahora > expiracion) {
                throw new MyUnauthorizedException('Tu acceso como investigador ha expirado');
            }
        }
        return payload;
    }
}
