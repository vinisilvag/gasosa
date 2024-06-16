import { AppError } from '@/helpers/app-error'

export class GasStationAlreadyLiked extends AppError {
  constructor() {
    super(409, 'Gas station already liked.')
  }
}
