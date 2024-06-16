import { AppError } from '@/helpers/app-error'

export class GasStationNotLikedYet extends AppError {
  constructor() {
    super(409, 'Gas station not liked yet.')
  }
}
