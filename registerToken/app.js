// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
const AWS = require('aws-sdk');
AWS.config.update({ region: "us-east-" });

exports.lambdaHandler = async (event, context) => {

    var message = JSON.stringify({
        "GCM": {
            "data": {
                "message": 'Foo bar!',
                "title": 'titletext'
            }
        }
    });

    // SNS.publish() params
    var params = {
        TargetArn: 'arn:aws:sns:us-east-1:238510686710:endpoint/GCM/AppNotifications/59442f64-ac7a-354d-ae1c-f97c8f7b4ea7',
        Subject: 'foo',
        Message: (message)
    }


    var sns = new AWS.SNS({ apiVersion: "2010-03-31" }).publish(params).promise();

    return sns;


};
