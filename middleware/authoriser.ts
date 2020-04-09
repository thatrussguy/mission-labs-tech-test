import { NextFunction, Response, Request } from "express";

const { AUTH_KEY } = process.env;

const authoriser = (req: Request, res: Response, next: NextFunction) => {
  const { method, headers } = req;
  const token = headers["x-token"];
  if (["DELETE", "PATCH", "POST"].includes(method))
    if (AUTH_KEY !== token)
      return res
        .status(403)
        .send({ msg: "Unauthorised! Provide valid X-Token header" });
  next();
};

module.exports = authoriser;
