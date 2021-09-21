import {
    TextPrompt,
    ComponentDialog,
    WaterfallDialog,
    ChoiceFactory,
    WaterfallStepContext
} from 'botbuilder-dialogs';

import { LuisRecognizer } from 'botbuilder-ai';

// This is for the i18n stuff
import  i18n  from './locales/i18nConfig';
import { CallbackBotDetails } from './callbackBotDetails';


const TEXT_PROMPT = 'TEXT_PROMPT';
export const CONFIRM_CALLBACK_STEP = 'CONFIRM_CALLBACK_STEP';
const CONFIRM_CALLBACK_WATERFALL_STEP = 'CONFIRM_CALLBACK_WATERFALL_STEP';

const MAX_ERROR_COUNT = 3;

export class ConfirmCallbackStep extends ComponentDialog {
    constructor() {
        super(CONFIRM_CALLBACK_STEP);

        // Add a text prompt to the dialog stack
        this.addDialog(new TextPrompt(TEXT_PROMPT));

        this.addDialog(new WaterfallDialog(CONFIRM_CALLBACK_WATERFALL_STEP, [
            this.preStep.bind(this),
           // this.initialStep.bind(this),
            this.finalStep.bind(this)
        ]));

        this.initialDialogId = CONFIRM_CALLBACK_WATERFALL_STEP;

    }
    async preStep(stepContext: WaterfallStepContext) {
 // Get the user details / state machine
 const callbackBotDetails:CallbackBotDetails  = stepContext.options as CallbackBotDetails;


 // DEBUG
// console.log('DEBUG callbackBotDETAILS:', callbackBotDetails);

 // Set the text for the prompt
 const standardMsg = i18n.__('callbackBotDialogStepStandardMsg');

 // Set the text for the retry prompt
 const retryMsg = i18n.__('confirmCallbackStepRetryMsg');

 // Check if the error count is greater than the max threshold
 if (callbackBotDetails.errorCount.confirmCallbackStep >= MAX_ERROR_COUNT) {
     // Throw the master error flag
     callbackBotDetails.masterError = true;

     // Set master error message to send
     const errorMsg = i18n.__('confirmCallbackStepErrorMsg');

     // Send master error message
     await stepContext.context.sendActivity(errorMsg);

     // End the dialog and pass the updated details state machine
     return await stepContext.endDialog(callbackBotDetails);
 }

 // Check the user state to see if callbackBotDetails.confirm_look_into_step is set to null or -1
 // If it is in the error state (-1) or or is set to null prompt the user
 // If it is false the user does not want to proceed
 if (callbackBotDetails.confirmCallbackStep === null || callbackBotDetails.confirmCallbackStep === -1) {


     // Setup the prompt message
     let promptMsg = standardMsg;

     // The current step is an error state
     if (callbackBotDetails.confirmCallbackStep === -1) {
         promptMsg = retryMsg;
     }
     const promptOptions: any =i18n.__('confirmCallbackStandardPromptOptions');
     const promptDetails = {
         prompt: ChoiceFactory.forChannel(stepContext.context, promptOptions, promptMsg)
     };
     return await stepContext.prompt(TEXT_PROMPT, promptDetails);
 }
 else {
     return await stepContext.next(false);
 }
    }
    /**
     * Initial step in the waterfall. This will kick of the ConfirmCallbackStep step
     *
     * If the confirmCallbackStep flag is set in the state machine then we can just
     * end this whole dialog
     *
     * If the confirmCallbackStep flag is set to null then we need to get a response from the user
     *
     * If the user errors out then we're going to set the flag to false and assume they can't / don't
     * want to proceed
     */
    async initialStep(stepContext) {
        // Get the user details / state machine
        const callbackBotDetails = stepContext.options;


        // DEBUG
       // console.log('DEBUG callbackBotDETAILS:', callbackBotDetails);

        // Set the text for the prompt
        const standardMsg = i18n.__('confirmCallbackStandardMsg');

        // Set the text for the retry prompt
        const retryMsg = i18n.__('confirmLookIntoStepRetryMsg');

        // Check if the error count is greater than the max threshold
        if (callbackBotDetails.errorCount.confirmCallbackStep >= MAX_ERROR_COUNT) {
            // Throw the master error flag
            callbackBotDetails.masterError = true;

            // Set master error message to send
            const errorMsg = i18n.__('confirmCallbackStepErrorMsg');

            // Send master error message
            await stepContext.context.sendActivity(errorMsg);

            // End the dialog and pass the updated details state machine
            return await stepContext.endDialog(callbackBotDetails);
        }

        // Check the user state to see if callbackBotDetails.confirm_look_into_step is set to null or -1
        // If it is in the error state (-1) or or is set to null prompt the user
        // If it is false the user does not want to proceed
        if (callbackBotDetails.confirmCallbackStep === null || callbackBotDetails.confirmCallbackStep === -1) {


            // Setup the prompt message
            let promptMsg = standardMsg;

            // The current step is an error state
            if (callbackBotDetails.confirmCallbackStep === -1) {
                promptMsg = retryMsg;
            }

            return await stepContext.prompt(TEXT_PROMPT, promptMsg);
        }
        else {
            return await stepContext.next(false);
        }
    }

    /**
     * Validation step in the waterfall.
     * We use LUIZ to process the prompt reply and then
     * update the state machine (callbackBotDetails)
     */
    async finalStep(stepContext) {
        // Get the user details / state machine
        const callbackDetails = stepContext.options;

        // Language check
        let applicationId = '';
        let  endpointKey = '';
        let endpoint = '';

        console.log('ACTIVITY: ', stepContext.context.activity);
        console.log('STEPCONTEXT: ', stepContext);

        // Then change LUIZ appID
        if (stepContext.context.activity.locale.toLowerCase() === 'fr-ca' ||
            stepContext.context.activity.locale.toLowerCase() === 'fr-fr') {
            applicationId = process.env.LuisAppIdFR;
            endpointKey = process.env.LuisAPIKeyFR;
            endpoint = `https://${ process.env.LuisAPIHostNameFR }.api.cognitive.microsoft.com`;
        } else {
            applicationId = process.env.LuisAppIdEN;
            endpointKey = process.env.LuisAPIKeyEN;
            endpoint = `https://${ process.env.LuisAPIHostNameEN }.api.cognitive.microsoft.com`;
        }

        // LUIZ Recogniser processing
        // const recognizer = new LuisRecognizer({
       //     applicationId: applicationId,
        //    endpointKey: endpointKey,
       //     endpoint: endpoint
       // }, {
       //     includeAllIntents: true,
       //     includeInstanceData: true
      //  }, true);

        // Call prompts recognizer
       // const recognizerResult = await recognizer.recognize(stepContext.context);

        // Top intent tell us which cognitive service to use.
        // const intent = LuisRecognizer.topIntent(recognizerResult, 'None', 0.50);
        const intent: string ='promptConfirmYes';
        const closeMsg = i18n.__('confirmCallbackStepCloseMsg');

        switch (intent) {
        // Proceed
        case 'promptConfirmYes':
            console.log('INTENT: ', intent);
            callbackDetails.confirmCallbackStep = true;
            return await stepContext.endDialog(callbackDetails);

        // Don't Proceed
        case 'promptConfirmNo':
            console.log('INTENT: ', intent);

            await stepContext.context.sendActivity(closeMsg);

            callbackDetails.confirmCallbackStep = false;
            return await stepContext.endDialog(callbackDetails);

        // Could not understand / None intent
        default: {
            // Catch all
            console.log('NONE INTENT');
            callbackDetails.confirmLookIntoStep = -1;
            callbackDetails.errorCount.confirmLookIntoStep++;

            return await stepContext.replaceDialog(CONFIRM_CALLBACK_STEP, callbackDetails);
        }
        }
    }
}

