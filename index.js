const Alexa = require('ask-sdk-core');
//var https = require('https');

var documentJSON = require('./aplJSON.json').document;
var response = require('./dataset'+ Math.floor(Math.random() * 4)   +'.json');

console.log(response[0]);

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
      
     if (supportsAPL(handlerInput)){
            handlerInput.responseBuilder
                .addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    document: documentJSON,
                    datasources: datasourcesJSON1()
                });
      }
      
    return handlerInput.responseBuilder
      .speak("Welcome to Airplane crash")
      .reprompt("What would you like?")
      .getResponse();
  },
};

/* END Launch Request Handler*/

// Get Crash Handler
const GetCrashHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'GetNewFactIntent';
  },                             

  async handle(handlerInput) {
    //const response = await httpGet();
    var value = 0;
    
    do{
      value = Math.floor(Math.random() * response.length);
      // console.log(response.length);
    }while((response[value].date === undefined) || 
           (response[value].summary === undefined) || 
           (response[value].location === undefined) || 
           (response[value].type === undefined));
    
    const date = getDate(response[value].date) ;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    //hard-coded months
    const monthNames = ["January", "February", "March", 
                        "April", "May", "June",
                        "July", "August", "September", 
                        "October", "November", "December"];

    return handlerInput.responseBuilder
            .speak("Okay. Here is what I got back from my request. " + day + " "
                      + monthNames[month - 1] + " " 
                      + year + "<break time='1s'/>" + " "
                      + response[value].location + "<break time='1s'/>" + " " 
                      + response[value].type + "<break time='1s'/>" + " " 
                      + response[value].summary)
            .reprompt("What would you like?")
            .getResponse();
  },
};
/* END Get Crash Handler */


const GetTodayCrashHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'GetTodayIntent';
  },
  async handle(handlerInput) {
    var todays = new Date();
    //const response = await httpGet();
    
    var value, date, month, day = 0;
    
    const month1 = todays.getMonth() + 1;
    const day1 = todays.getDate();
    
    if(response.includes(day1) && response.includes(month1)){
      do{
        try{
          date = getDate(response[value].date);
          month = date.getMonth();
          day = date.getDay();
        }catch(err){}
          value++;
      }while(day1 !== day && month1 !== month);
    
      value--;
      
      return handlerInput.responseBuilder
              .speak("Okay. Fact of today. " + 
                     response[value].location + "<break time='1s'/>" + " " + 
                     response[value].type + "<break time='1s'/>" + " " + 
                     response[value].summary)
              .reprompt("What would you like?")
              .getResponse();
    }else{
      return handlerInput.responseBuilder
        .speak("Today no airplane crash happened " + "<break time='1s'/>" + "fortunately")
        .reprompt("What would you like?")
        .getResponse();
    }
  },
};

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
        GetTodayCrashHandler,
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

/*function httpGet(host, path) {
  return new Promise(((resolve, reject) => {
    var options = {
        host: host,
        port: 443,
        path: path,
        method: 'GET',
    };

const request = https.request(options, (response) => {
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
}*/

//no polimorfismo...credo

function datasourcesJSON1(){
    return  {
        "datasources": {
            "bodyTemplate1Data": {
                "type": "object",
                "objectId": "bt1Sample",
                "backgroundImage": {
                    "contentDescription": null,
                    "smallSourceUrl": null,
                    "largeSourceUrl": null,
                    "sources": [
                        {
                            "url": "https://www.nasa.gov/sites/default/files/images/304128main_EC84-31806_full.jpg",
                            "size": "small",
                            "widthPixels": 0,
                            "heightPixels": 0
                        },
                        {
                            "url": "https://www.nasa.gov/sites/default/files/images/304128main_EC84-31806_full.jpg",
                            "size": "large",
                            "widthPixels": 0,
                            "heightPixels": 0
                        }
                    ]
                }
            }
        }
    };
}



function datasourcesJSON2(text){
    return  {
        "datasources": {
            "bodyTemplate1Data": {
                "type": "object",
                "objectId": "bt1Sample",
                "backgroundImage": {
                    "contentDescription": null,
                    "smallSourceUrl": null,
                    "largeSourceUrl": null,
                    "sources": [
                        {
                            "url": "https://www.nasa.gov/sites/default/files/images/304128main_EC84-31806_full.jpg",
                            "size": "small",
                            "widthPixels": 0,
                            "heightPixels": 0
                        },
                        {
                            "url": "https://www.nasa.gov/sites/default/files/images/304128main_EC84-31806_full.jpg",
                            "size": "large",
                            "widthPixels": 0,
                            "heightPixels": 0
                        }
                    ]
                },
                "textContent": {
                    "primaryText": {
                        "type": "PlainText",
                        "text" : text
                    }
                }
            }
        }
    };
}
 
