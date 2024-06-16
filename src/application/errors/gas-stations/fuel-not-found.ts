import { AppError } from '@/helpers/app-error'

export class FuelNotFound extends AppError {
  constructor() {
    super(404, 'Fuel not found.')
  }
}
