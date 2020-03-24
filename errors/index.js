exports.routeNotFound = (_, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (_, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};
