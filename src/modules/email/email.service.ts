import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private transporter: Mail;
  constructor(private configService: ConfigService) {
    this.configService = configService;
    const oauth2Client = new google.auth.OAuth2(
      configService.get('GMAIL_CLIENT_ID'),
      configService.get('GMAIL_CLIENT_SECRET'),
      configService.get('GMAIL_REDIRECT_URI'),
    );

    oauth2Client.setCredentials({
      refresh_token: configService.get('GMAIL_REFRESH_TOKEN'),
    });

    this.transporter = nodemailer.createTransport({
      host: configService.get('GMAIL_HOST'),
      port: +configService.get('GMAIL_PORT'),
      secure: true,
      auth: {
        type: 'OAuth2',
        user: configService.get('GMAIL_DIRECTION'),
        clientId: configService.get('GMAIL_CLIENT_ID'),
        clientSecret: configService.get('GMAIL_CLIENT_SECRET'),
        refreshToken: configService.get('GMAIL_REFRESH_TOKEN'),
        accessToken: oauth2Client.getAccessToken(),
      },
    } as nodemailer.TransportOptions);
  }

  async sendEmail({ to, subject, name, lastname, confirmURL }: CreateEmailDto) {
    const htmlTemplate = fs.readFileSync(
      'src/modules/email/templates/confirmation.html',
      'utf-8',
    );
    const correoHtml = htmlTemplate
      .replace('[username]', `${name} ${lastname}`)
      .replaceAll('[confirmURL]', confirmURL)
      .replaceAll('[platformName]', 'To Do App')
      .replace('[expired]', '10')
      .replaceAll('[emailSupport]', this.configService.get('GMAIL_DIRECTION'));

    const mailOptions = {
      from: `Ulises Vargas <${this.configService.get('GMAIL_DIRECTION')}>`,
      to,
      subject,
      html: correoHtml,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
