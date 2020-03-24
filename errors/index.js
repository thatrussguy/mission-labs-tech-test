exports.routeNotFound = (_, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (_, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle500 = (err, _, res, _next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
