const { AUTH_KEY } = process.env;

const authoriser = (req, res, next) => {
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
