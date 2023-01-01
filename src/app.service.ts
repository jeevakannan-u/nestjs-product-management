import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  
  getHandshake(): string {
    return 'This is testing - Jeeva Kannan !';
  }
}
