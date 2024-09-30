import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AppConfigService } from "src/modules/app-config/appconfig.service";
import { Request } from "express";
import * as jwksRsa from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class Auth0Guard implements CanActivate{
  private jwksClient: any;

  constructor(private configService: AppConfigService, private usersService: UsersService){
    this.jwksClient = jwksRsa({
      jwksUri: configService.oauth2.keysUrl, // Replace with your Auth0 domain
      cache: true, // Cache the keys
      rateLimit: true, // Throttle requests
      jwksRequestsPerMinute: 5, // Rate limit to prevent too many requests
    });
  }

  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token?.length) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const user = await this.verifyToken(token);
      request['user'] = await this.usersService.findByEmail(user.email); // Attach the decoded user to the request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader) return null;


    const token = authHeader.replace('Bearer ', '');
    console.log(token);
    return token;
  }

    // Helper method to retrieve signing key
  private async getSigningKey(kid: string): Promise<string> {
      const getSigningKey = promisify(this.jwksClient.getSigningKey);
      const key = await getSigningKey(kid);
      return key.getPublicKey(); // Get the public key from the JWKS
  }

  async verifyToken(token: string): Promise<any> {
    const decodedHeader = jwt.decode(token,{complete: true});

    console.log(decodedHeader);
    if (!decodedHeader || !decodedHeader.header.kid) {
      throw new UnauthorizedException('Invalid token structure');
    }

    const kid = decodedHeader.header.kid;
    const publicKey = await this.getSigningKey(kid);

    try {
      // Verify the token using the public key, issuer, and audience
      const verifiedToken = jwt.verify(token, publicKey, {
        algorithms: ['RS256'], // Auth0 uses RS256
      //   audience: 'YOUR_AUTH0_AUDIENCE', // Replace with your Auth0 audience
      //   issuer: `https://YOUR_AUTH0_DOMAIN/`, // Replace with your Auth0 issuer
      });
      return verifiedToken;
    } catch (error) {
      throw new UnauthorizedException('Token verification failed');
    }
  }
}