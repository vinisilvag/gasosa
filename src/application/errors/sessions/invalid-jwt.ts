import { AppError } from '@/helpers/app-error'

export class InvalidJwt extends AppError {
  constructor() {
    super(401, 'Invalid JWT token.')
  }
}
