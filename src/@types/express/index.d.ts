declare namespace Express {
  export interface Request {
    session: {
      id: number
    }
  }
}
