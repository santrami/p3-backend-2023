import { ErrorRequestHandler, RequestHandler } from "express";

export const defaultHandlerError: ErrorRequestHandler = ( err, req, res, next) => {
  res.status(500).json({
    type: err.constructor.name,
    message: err.toString(),
  });
};

export const errorChecked = (handler:RequestHandler): RequestHandler => {
  return async (req,res,next)=>{
    try {
      await handler(req,res,next);
    } catch (err) {
      next (err);
    }
  } 
}