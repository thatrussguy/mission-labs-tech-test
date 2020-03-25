exports.routeNotFound = (_, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (_, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle500 = (err, _, res, _next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.handleSqliteErrors = (err, _, res, next) => {
  let [error] = err.stack.split(". ");
  const errorReference = {
    "TypeError: `sqlite` does not support inserting default values": {
      status: 400,
      msg: error
    },
    "Error: Empty .update() call detected! Update data does not contain any values to update": {
      status: 400,
      msg: error
    },
    "SQLITE_ERROR: no such column": {
      status: 400,
      msg: error
    },
    "SQLITE_ERROR: no such table": {
      status: 500,
      msg: "Unable to access database table"
    }
  };
  if (error.includes("SQLITE_ERROR: no such column")) {
    error = "SQLITE_ERROR: no such column";
  }
  if (error.includes("SQLITE_ERROR: no such table")) {
    error = "SQLITE_ERROR: no such table";
  }
  if (errorReference[error]) {
    res.status(errorReference[error].status).send({
      msg: errorReference[error].msg
    });
  } else next(err);
};
