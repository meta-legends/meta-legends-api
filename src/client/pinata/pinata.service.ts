import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PinataService {
  async postJson(metadata: object) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
    };
    const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
    try {
      const response = await axios.post(url, JSON.stringify(metadata), config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
