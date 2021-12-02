const jwt = require("jsonwebtoken");

const jwtPublicKey = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAodD/IEagav7wlBX+k30YOSFpYT0u7AtV3ljwC52ShCFFGVvw86T5
VTbg5Q/L/dgQT0+OZi+Fe/aAIL6j+3d8+Md5nGg7zqTv33GE7tN4ZoSkYnPMAm1I
PjkOevpia98u8n1jWE/OnDnQqgozcy2zssGcJ1+QwJWuZWVObbFiA6ppFlyb9Hm8
2wEgvBqjuTqCvLdJO5CtY5ya5OpGLpnqlsXTRgJEEFk0VTdH56ztcLFMDMxm4OVW
aWy+i4YieTRRKnbyT7fzDPiZupkcg2jwVF49CtyB9UWtE/+/BAKtJtBLfdZ5X1dK
RqesE10ysVdGxeyeRpyFltEfF5QWAzn99wIDAQAB
-----END RSA PUBLIC KEY-----`;

// This handler validates the token
exports.handler = (event, context, callback) => {
  console.log(`Run ${Math.random()}`);
  if (!event.authorizationToken) {
    return callback("Unauthorized");
  }
  const accessToken = event.authorizationToken.replace(/^Bearer /, "");
  console.log(`Token:${accessToken}`);

  jwt.verify(
    accessToken,
    jwtPublicKey,
    { algorithms: ["RS256"] },
    (error, decoded) => {
      console.log(error);
      if (error) {
        callback("Unauthorized");
      } else {
        callback(null, decoded);
      }
    }
  );
};
