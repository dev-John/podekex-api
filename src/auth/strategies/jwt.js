const name = "jwt";
const schema = "jwt";
const options = {
  key: process.env.JWT_SECRET,
  validate: function () {
    return { isValid: true };
  },
  verifyOptions: {
    algorithms: ["HS256"],
  },
};

export { name, schema, options };
