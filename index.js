const { withError, withErrorHadling, throwHttpBadRequest } = require("./utils");
const express = require("express");

const app = express();

const getUsers = withErrorHadling((req, res) => {
  const { shouldThrow } = req.query;
  if (Boolean(shouldThrow)) throwHttpBadRequest();
  res.send({
    success: true,
  });
});

app.get("/users", getUsers);

app.listen(3000, () => {
  console.log("Sever Working!!");
});
