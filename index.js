const Alexa = require('ask-sdk-core');
var http = require('http');
var documentJSON = require('./aplJSON.json').document;
var datasourcesJSON = require('./aplJSON.json').datasources;
var buildingAPL = require('./buildingAPL');

var response;

function supportsAPL(handlerInput){
    const supportedInterfaces =
   
handlerInput.requestEnvelope.context.System.device.supportedInterfaces;
    const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
    return aplInterface !== null && aplInterface !== undefined;
}

//Launch Request Handler

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },

  handle(handlerInput) {
     //var datasourcesJSON = datasourcesJSON1();
     
     if (supportsAPL(handlerInput)){
            handlerInput.responseBuilder
                .addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    document: documentJSON,
                    datasources: datasourcesJSON
                });
      }
      
    return handlerInput.responseBuilder
      .speak("Welcome to Airplane crash")
      .reprompt("What would you like?")
      .getResponse();
  },
};
/* END Launch Request Handler*/

/* Get Crash Handler */
const GetCrashHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'GetNewFactIntent';
  },                             
  async handle(handlerInput) {
    do{
      response = await httpGet();
      console.log(response);
    }while((response.date === undefined) || 
           (response.summary === undefined) || 
           (response.location === undefined) || 
           (response.type === undefined));
    
    var fileAPL = buildingAPL.datasourcesJSON(response.summary);
    
    const date = getDate(response.date) ;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    //hard-coded months
    const monthNames = ["January", "February", "March", 
                        "April", "May", "June",
                        "July", "August", "September", 
                        "October", "November", "December"];
     if (supportsAPL(handlerInput)){
        handlerInput.responseBuilder
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: fileAPL.document,
                datasources: fileAPL.datasources
            });
      }

    return handlerInput.responseBuilder
            .speak("Okay. Here is what I got back from my request. " + day + " "
                      + monthNames[month - 1] + " " 
                      + year + "<break time='1s'/>" + " "
                      + response.location + "<break time='1s'/>" + " " 
                      + response.type + "<break time='1s'/>" + " " 
                      + response.summary)
            .getResponse();
  },
};
/* END Get Crash Handler */

const HelpIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};


const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
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

const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';


exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelpIntentHandler,
        GetCrashHandler,
        SessionEndedRequestHandler,
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();

/* functions */ 

function getDate(date){
  var d = new Date(date);
  return d;
}

function httpGet() {
  return new Promise(((resolve, reject) => {
    var options = {
        host: 'alexaskilldb.altervista.org',
        port: 80,
        path: '/datasetSelect.php',
        method: 'POST',
  };

const request = http.request(options, (response) => {
      response.setEncoding('utf8');
      let returnData = '';

      response.on('data', (chunk) => {
        returnData += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(returnData));
      });

      response.on('error', (error) => {
        reject(error);
      });
    });
    request.end();
  }));
}


