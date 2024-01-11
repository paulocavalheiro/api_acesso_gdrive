import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";
import fetch from "node-fetch";
import axios from "axios";

@Injectable()
export class AuthGdriveService {
    public readonly googleClient: OAuth2Client;
    private readonly logger = new Logger(AuthGdriveService.name);
  
    constructor(private configService: ConfigService) {
      this.googleClient = new OAuth2Client(
        this.configService.get("GOOGLE_CLIENT_ID"),
        this.configService.get("GOOGLE_CLIENT_SECRET"),
        "http://localhost:8080/auth/google/redirect"
      );
    }
  
    async getAuthUrl(): Promise<string> {
      const authUrl = this.googleClient.generateAuthUrl({
        access_type: "offline",
        scope: [
          "https://www.googleapis.com/auth/drive",
          "https://www.googleapis.com/auth/userinfo.profile",
        ],
      });
      return authUrl;

    }
  
    async listFiles(accessToken: string, directoryId: string): Promise<string[]> {
      const response = await axios.get(
        `https://www.googleapis.com/drive/v3/files/`,
        {
          params: {
            q: `${process.env.GOOGLE_DIR_ID} in parents and trashed = false`,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      const data = response.data;
      if (data.files && Array.isArray(data.files)) {
        const fileNames = data.files.map((file: any) => file.name);
        this.logger.log(fileNames);
        return fileNames;
      } else {
        return [];
      }
      
    }
}
