import { AppError } from '@/helpers/app-error'

export class NotOwnerOfTheFuel extends AppError {
  constructor() {
    super(401, 'You are not the owner of this fuel.')
  }
}
