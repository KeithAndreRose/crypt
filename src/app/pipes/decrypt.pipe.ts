import { Pipe, PipeTransform } from '@angular/core';
import { Rabbit, enc } from 'crypto-js'
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'decrypt'
})
export class DecryptPipe implements PipeTransform {
  constructor(private authService:AuthService) { }

  transform(value: String, args?: any): String {
    return Rabbit.decrypt(value, this.authService.secretKey).toString(enc.Utf8);
  }

}
