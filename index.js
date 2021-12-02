const jwt = require("jsonwebtoken");

const jwtPublicKey = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAp6ZRhF+bXypVlJEDL2v/kEL4Mo9tx3vUOitMhxPDA1JCZs2TGqN0
LxJdDbCWPaIbgTfqwdmVlC7l2tTQtJhC48TzF8BEjY2341/jBVY0z1D8/v2rpSw8
eGLIhyVH/sT+/7F+Arh0HA62ctvrnYIie+vsnDiMrjiMwTpuzcVAGwT5PaaU9bu9
e7oes7jX3jI/jI76llicbZgbTXijWLp/V0WBbuWatvFfBzqBmBQNGGb8hDEDM0Qu
zY7KiOddKCwbdGgM1DAl/AjVS3Bfu9f9epAaVt2i2XTCUSHOi+0iaoQCMn9hhncF
CWlWZ9GwwhMecueXwSBrtuwp1i+1RtwcfQIDAQAB
-----END RSA PUBLIC KEY-----`;

// This handler validates the token
exports.handler = async (event, context, callback) => {
  console.log("invoked");
  const accessToken = event.authorizationToken.replace(/^Bearer /, "");
  console.log("Token: ", accessToken);

  jwt.verify(
    accessToken,
    jwtPublicKey,
    { algorithms: ["RS256"] },
    (error, decoded) => {
      if (error) {
        callback("Unauthorized");
      } else {
        callback(null, decoded);
      }
    }
  );
};
