import { AppError } from '@/helpers/app-error'

export class UserAlreadyExists extends AppError {
  constructor() {
    super(409, 'Email already registered.')
  }
}
