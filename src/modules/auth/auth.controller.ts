import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { EmailService } from '../email/email.service';
import { Auth } from './decorators/auth.decorator';
import { User } from './decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.register(createUserDto);

      const token = this.authService.generateTemporalToken(user.id);

      await this.emailService.sendEmail({
        to: user.email,
        name: user.name,
        lastname: user.lastname,
        subject: 'Confirmación de cuenta',
        confirmURL: `http://localhost:5000/api/auth/confirmation?access_token=${token}`,
      });

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  @Auth()
  @Post('confirmation')
  confirmAccount(@User('id') userId: string) {
    return this.authService.confirmAccount(userId);
  }
}
