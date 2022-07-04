const withError =
  (code, message) =>
  (optionalMessage = message) => {
    throw Object.assign(new Error(), {
      code,
      message: optionalMessage,
    });
  };

const withErrorHadling = (callback) => async (req, res) => {
  try {
    await callback(req, res);
  } catch (error) {
    const { code, message } = error;
    
    res.status(code).send({
      code,
      message,
    });
  }
};

const throwHttpServerError = withError(500, "Internal Problem");
const throwHttpPageNotFound = withError(404, "Resource Not Found");
const throwHttpBadRequest = withError(400, "Bad Request");

module.exports = {
  withError,
  withErrorHadling,
  throwHttpBadRequest,
  throwHttpPageNotFound,
  throwHttpServerError,
};
