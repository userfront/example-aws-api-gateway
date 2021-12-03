# Userfront AWS API Gateway example

This example shows how to use Userfront for access control with an AWS API Gateway.

If you don't have one already, [create an API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-create-api.html).

## Steps

1. Create a Lambda function to use as an Authorizer
2. Add the Authorizer to your API Gateway
3. Test that your Authorizer is working

---

### 1. Create a Lambda function to use as an Authorizer

In your [AWS Lambda dashboard](https://console.aws.amazon.com/lambda/home#/functions), create a Lambda function called `userfront-authorizer` (see [steps](https://docs.aws.amazon.com/lambda/latest/dg/getting-started-create-function.html#gettingstarted-zip-function)).

Next, use your terminal to clone this repo to a local directory on your computer:

```
git clone https://github.com/userfront/example-aws-api-gateway.git
cd example-aws-api-gateway
npm install
```

Replace the `jwtPublicKey` in `/index.js` with your own JWT public key:

```
-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAodD/IEagav7wlBX+k30YOSFpYT0u7AtV3ljwC52ShCFFGVvw86T5
VTbg5Q/L/dgQT0+OZi+Fe/aAIL6j+3d8+Md5nGg7zqTv33GE7tN4ZoSkYnPMAm1I
PjkOevpia98u8n1jWE/OnDnQqgozcy2zssGcJ1+QwJWuZWVObbFiA6ppFlyb9Hm8
2wEgvBqjuTqCvLdJO5CtY5ya5OpGLpnqlsXTRgJEEFk0VTdH56ztcLFMDMxm4OVW
aWy+i4YieTRRKnbyT7fzDPiZupkcg2jwVF49CtyB9UWtE/+/BAKtJtBLfdZ5X1dK
RqesE10ysVdGxeyeRpyFltEfF5QWAzn99wIDAQAB
-----END RSA PUBLIC KEY-----
```

Generate a zip file to upload to AWS:

```
zip -r function.zip .
```

Upload the zip file:

```
aws lambda update-function-code --function-name userfront-authorizer --zip-file fileb://function.zip
```

You should be able to see that your code was uploaded when you visit the Lambda function in the AWS dashboard.

### 2. Add the Authorizer to your API Gateway

In your [AWS API Gateway dashboard](https://console.aws.amazon.com/apigateway/main/apis), select your API Gateway.

In the side menu select `Authorizers` > `Create new authorizer`.

Create a Lambda authorizer named `Userfront`, and select your Lambda function. Finally select `Token` for the Lambda Event Payload and the `Authorization` header for the Token Source.

![AWS API Gateway Authorizer](https://res.cloudinary.com/component/image/upload/v1638503733/guide/examples/aws-api-gateway-authorizer.png)

Select `Save` to create the authorizer.

Now visit `Resources` in the sidebar and select a resource and method. In the dialog shown, select `Userfront` as the Authorization method.

![AWS API Gateway Resource](https://res.cloudinary.com/component/image/upload/v1638503733/guide/examples/aws-api-gateway-resource.png)

Now select `Actions` > `Deploy API` from the dropdown.

### 3. Test that your Authorizer is working

Now you should be able to test your endpoint with a request like:

```
GET https://<your-aws-api-gateway-url>/userfront-example

{
  headers: {
    Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6I..."
  }
}
```

#### Troubleshooting

- Make sure that your access token and public key are both in the same mode (live or test).
