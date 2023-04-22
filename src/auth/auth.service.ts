import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  private apiKeys: string[] = JSON.parse(process.env.API_KEYS);

  validateApiKey(apiKey: string) {
    return this.apiKeys.find(apiK => apiKey === apiK);
  }
}
