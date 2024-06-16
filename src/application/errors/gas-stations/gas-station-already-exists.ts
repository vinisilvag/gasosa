import { AppError } from '@/helpers/app-error'

export class GasStationAlreadyExists extends AppError {
  constructor() {
    super(409, 'Email already registered.')
  }
}
