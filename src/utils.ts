import { ErrorRequestHandler, RequestHandler } from "express";

export const defaultHandlerError: ErrorRequestHandler = ( err, req, res, next) => {
  res.status(500).json({
    type: err.constructor.name,
    message: err.toString(),
  });
};

export const errorChecked = (handler:RequestHandler): RequestHandler => {
  return (req,res,next)=>{
    try {
      handler(req,res,next);
    } catch (error) {
      next (error);
    }
  }
}