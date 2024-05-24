import { AppError } from '@helpers/app-error'

export class UserNotFound extends AppError {
  constructor() {
    super(404, 'User not found.')
  }
}
