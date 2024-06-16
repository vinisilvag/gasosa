import { AppError } from '@/helpers/app-error'

export class GasStationNotFound extends AppError {
  constructor() {
    super(404, 'Gas station not found.')
  }
}
