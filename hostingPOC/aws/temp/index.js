const Alexa = require('ask-sdk');


const LaunchRequestHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
      const speakOutput = 'Welcome, you can say Hello or Help. Which would you like to try?';
      return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(speakOutput)
          .getResponse();
  }
};
const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && Alexa.getIntentName(handlerInput.requestEnvelope) === 'test';
  },
  handle(handlerInput) {
      const speakOutput = 'Hello World!';
      return handlerInput.responseBuilder
          .speak(speakOutput)
          //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
          .getResponse();
  }
};
const HelpIntentHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
      const speakOutput = 'You can say hello to me! How can I help?';

      return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(speakOutput)
          .getResponse();
  }
};
const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
              || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
      const speakOutput = 'Goodbye!';
      return handlerInput.responseBuilder
          .speak(speakOutput)
          .getResponse();
  }
};
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput) {
      // Any cleanup logic goes here.
      return handlerInput.responseBuilder.getResponse();
  }
};

const IntentReflectorHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
  },
  handle(handlerInput) {
      const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
      const speakOutput = `You just triggered ${intentName}`;

      return handlerInput.responseBuilder
          .speak(speakOutput)
          //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
          .getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
      return true;
  },
  handle(handlerInput, error) {
      console.log(`~~~~ Error handled: ${error.stack}`);
      const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

      return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(speakOutput)
          .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders
  .custom()
  .addRequestHandlers(
      LaunchRequestHandler,
      HelloWorldIntentHandler,
      HelpIntentHandler,
      CancelAndStopIntentHandler,
      SessionEndedRequestHandler,
      IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
      ) 
  .addErrorHandlers(
      ErrorHandler,
      )
  .lambda();


// async function(event, context) {
//   console.log("Body: \n" + JSON.stringify(event));
//   var name = event.request.intent != null ? event.request.intent.name : "unk";
//   return {
//     "version": "1.0",
//     "response": {
//       "outputSpeech": {
//         "type": "SSML",
//         "ssml": `<speak>Welcome to Sample. <amazon:effect name="whispered">Intent name is ${name}</amazon:effect></speak>`
//       },
//       "reprompt": {
//         "outputSpeech": {
//           "type": "SSML",
//           "ssml": "<speak>I didn't catch that. What can I help you with?</speak>"
//         }
//       },
//       "shouldEndSession": false
//     },
//     "userAgent": "ask-node/2.3.0 Node/v8.10.0",
//     "sessionAttributes": {}
//   };
//   return {
//     "expectUserResponse": true,
//     "expectedInputs": [
//       {
//         "inputPrompt": {
//           "richInitialPrompt": {
//             "items": [
//               {
//                 "simpleResponse": {
//                   "textToSpeech": "Howdy! ",
//                   "displayText": "Howdy! 12345"
//                 }
//               }
//             ]
//           }
//         },
//         "possibleIntents": [
//           {
//             "intent": "actions.intent.TEXT"
//           }
//         ]
//       }
//     ]
//   };
// }