import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('signin')
    // @ApiBody({
    //     schema: {
    //             type: 'object',
    //             properties: {
    //                 username: { type: 'string' },
    //                 password: { type: 'string' },
    //         },
    //     },
    // })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Unauthorized' },
                statusCode: { type: 'number', example: 401 },
            },
        },
    })
    @ApiOkResponse({
        description: 'Successful login',
        schema: {
        type: 'object',
          properties: {
            access_token: { type: 'string', example: 'eyJhbGciO...' },
            expiresIn: { type: 'number', example: 1745639488 },
          },
        },
    })
      
    async signin(@Body() payload: SignInDto) {
        const { username, password } = payload;
        return this.authService.signIn(username, password);
    }
}
