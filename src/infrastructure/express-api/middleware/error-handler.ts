import { NextFunction, Request, Response } from "express";

export const errorHandlingMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(400).json({message: error.message})
} 