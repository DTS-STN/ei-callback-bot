"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserPhoneNumberStep = exports.GET_USER_PHONE_NUMBER_STEP = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
// This is for the i18n stuff
const i18nConfig_1 = __importDefault(require("./locales/i18nConfig"));
const TEXT_PROMPT = 'TEXT_PROMPT';
exports.GET_USER_PHONE_NUMBER_STEP = 'GET_USER_PHONE_NUMBER_STEP';
const GET_USER_PHONE_NUMBER_WATERFALL_STEP = 'GET_USER_PHONE_NUMBER_WATERFALL_STEP';
const MAX_ERROR_COUNT = 3;
class GetUserPhoneNumberStep extends botbuilder_dialogs_1.ComponentDialog {
    constructor() {
        super(exports.GET_USER_PHONE_NUMBER_STEP);
        // Add a text prompt to the dialog stack
        this.addDialog(new botbuilder_dialogs_1.TextPrompt(TEXT_PROMPT));
        this.addDialog(new botbuilder_dialogs_1.WaterfallDialog(GET_USER_PHONE_NUMBER_WATERFALL_STEP, [
            this.initialStep.bind(this),
            this.finalStep.bind(this)
        ]));
        this.initialDialogId = GET_USER_PHONE_NUMBER_WATERFALL_STEP;
    }
    /**
     * Kick off the dialog by asking for an email address
     *
     */
    async initialStep(stepContext) {
        // Get the user details / state machine
        const callbackBotDetails = stepContext.options;
        // Set the text for the prompt
        const standardMsg = i18nConfig_1.default.__('getUserPhoneNumberStepStandardMsg');
        // Set the text for the retry prompt
        const retryMsg = i18nConfig_1.default.__('getUserPhoneNumberStepRetryMsg');
        // Check if the error count is greater than the max threshold
        if (callbackBotDetails.errorCount.getUserPhoneNumberStep >= MAX_ERROR_COUNT) {
            // Throw the master error flag
            callbackBotDetails.masterError = true;
            // End the dialog and pass the updated details state machine
            return await stepContext.endDialog(callbackBotDetails);
        }
        // Check the user state to see if callbackBotDetails.getAndSendEmailStep is set to null or -1
        // If it is in the error state (-1) or or is set to null prompt the user
        // If it is false the user does not want to proceed
        if (callbackBotDetails.getUserPhoneNumberStep === null || callbackBotDetails.getUserPhoneNumberStep === -1) {
            // Setup the prompt message
            let promptMsg = '';
            // The current step is an error state
            if (callbackBotDetails.getUserPhoneNumberStep === -1) {
                promptMsg = retryMsg;
            }
            else {
                promptMsg = standardMsg;
            }
            return await stepContext.prompt(TEXT_PROMPT, promptMsg);
        }
        else {
            return await stepContext.next(false);
        }
    }
    /**
     *
     *
     */
    async finalStep(stepContext) {
        // Get the user details / state machine
        const callbackBotDetails = stepContext.options;
        callbackBotDetails.phoneNumber = stepContext.result;
        // Result has come through
        if (stepContext.result) {
            const confirmMsg = i18nConfig_1.default.__('getUserPhoneNumberConfirmMsg');
            callbackBotDetails.getUserPhoneNumberStep = true;
            await stepContext.context.sendActivity(confirmMsg);
            return await stepContext.endDialog(callbackBotDetails);
        }
        // No result provided
        else {
            callbackBotDetails.getUserPhoneNumberStep = -1;
            callbackBotDetails.errorCount.getUserPhoneNumberStep++;
            return await stepContext.replaceDialog(exports.GET_USER_PHONE_NUMBER_STEP, callbackBotDetails);
        }
    }
}
exports.GetUserPhoneNumberStep = GetUserPhoneNumberStep;
//# sourceMappingURL=getUserPhoneNumberStep.js.map