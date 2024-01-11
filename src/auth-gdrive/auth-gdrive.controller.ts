import { Controller, Get, Logger, Post, Query, Redirect } from "@nestjs/common";
import { AuthGdriveService } from "./auth-gdrive.service";
import { query } from "express";

@Controller("auth/google")
export class AuthGdriveController {
  googleClient: any;
  constructor(private authService: AuthGdriveService) {}
  private readonly logger = new Logger(AuthGdriveService.name);

  /**
   * 
   * @returns url modal altenticacao google
   */
  @Get()
  @Redirect()
  async googleLogin() {
    const authUrl = await this.authService.getAuthUrl();
    this.logger.log(authUrl);
    
    return { url: authUrl };
  }

  @Get("redirect")
  async getInfo(@Query("code") code: string) {
    const tokenResponse = await this.authService.googleClient.getToken(code);
    const accessToken = tokenResponse.tokens.access_token;

    const directoryId = "GOOGLE_DIR_ID";
	
    const driveFiles = await this.authService.listFiles(
      accessToken,
      directoryId
    );
    this.logger.log(driveFiles);
  }
}
