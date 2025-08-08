const adminAuth = (req, res, next) => {
  console.log(" admin auth getting checked !!");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorize request");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("user auth getting checked !!");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorize request");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
