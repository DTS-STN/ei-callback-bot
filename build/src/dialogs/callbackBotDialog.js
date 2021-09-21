"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackBotDialog = exports.CALLBACK_BOT_DIALOG = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const confirmCallbackStep_1 = require("./confirmCallbackStep");
const getUserPhoneNumberStep_1 = require("./getUserPhoneNumberStep");
const confirmAuthWordStep_1 = require("./confirmAuthWordStep");
const getPreferredCallbackDateAndTimeStep_1 = require("./getPreferredCallbackDateAndTimeStep");
const confirmCallbackDetailsStep_1 = require("./confirmCallbackDetailsStep");
// This is for the i18n stuff
const i18nConfig_1 = __importDefault(require("./locales/i18nConfig"));
exports.CALLBACK_BOT_DIALOG = 'CALLBACK_BOT_DIALOG';
const MAIN_CALLBACK_BOT_WATERFALL_DIALOG = 'MAIN_CALLBACK_BOT_WATERFALL_DIALOG';
const CALLBACK_BOT_DETAILS = 'CALLBACK_BOT_DETAILS';
class CallbackBotDialog extends botbuilder_dialogs_1.ComponentDialog {
    constructor(id) {
        super(id || exports.CALLBACK_BOT_DIALOG);
        // Add the ConfirmLookIntoStep dialog to the dialog stack
        this.addDialog(new confirmCallbackStep_1.ConfirmCallbackStep());
        this.addDialog(new getUserPhoneNumberStep_1.GetUserPhoneNumberStep());
        this.addDialog(new getPreferredCallbackDateAndTimeStep_1.GetPreferredCallbackDateAndTimeStep());
        this.addDialog(new confirmAuthWordStep_1.ConfirmAuthWordStep());
        this.addDialog(new confirmCallbackDetailsStep_1.ConfirmCallbackDetailsStep());
        this.addDialog(new botbuilder_dialogs_1.WaterfallDialog(MAIN_CALLBACK_BOT_WATERFALL_DIALOG, [
            this.welcomeStep.bind(this),
            this.confirmCallbackStep.bind(this),
            this.getUserPhoneNumberStep.bind(this),
            this.getPreferredCallbackDateAndTimeStep.bind(this),
            this.confirmAuthWordStep.bind(this),
            this.ConfirmCallbackDetailsStep.bind(this),
            this.finalStep.bind(this)
        ]));
        this.initialDialogId = MAIN_CALLBACK_BOT_WATERFALL_DIALOG;
    }
    /**
     * Initial step in the waterfall. This will kick of the callbackBot dialog
     * Most of the time this will just kick off the CONFIRM_LOOK_INTO_STEP dialog -
     * But in the off chance that the bot has already run through the switch statement
     * will take care of edge cases
     */
    async welcomeStep(stepContext) {
        // Get the callback Bot details / state machine for the current user
        const callbackBotDetails = stepContext.options;
        const welcomeMsg = i18nConfig_1.default.__('callbackBotDialogWelcomeMsg');
        await stepContext.context.sendActivity(welcomeMsg);
        return await stepContext.next(callbackBotDetails);
    }
    /*
     * Initial step in the waterfall. This will kick of the callback bot dialog
     * Most of the time this will just kick off the CONFIRM_CALLBACK_STEP dialog -
     * But in the off chance that the bot has already run through the switch statement
     * will take care of edge cases
     */
    async confirmCallbackStep(stepContext) {
        // Get the state machine from the last step
        const callbackBotDetails = stepContext.result;
        // DEBUG
        // console.log('DEBUG: confirmCallbackStep:', callbackBotDetails);
        switch (callbackBotDetails.confirmCallbackStep) {
            // The confirmLookIntoStep flag in the state machine isn't set
            // so we are sending the user to that step
            case null:
                return await stepContext.beginDialog(confirmCallbackStep_1.CONFIRM_CALLBACK_STEP, callbackBotDetails);
            // The confirmLookIntoStep flag in the state machine is set to true
            // so we are sending the user to next step
            case true:
                return await stepContext.next(callbackBotDetails);
            // The confirmLookIntoStep flag in the state machine is set to false
            // so we are sending to the end because they don't want to continue
            case false:
                // code block
                return await stepContext.endDialog(callbackBotDetails);
            // Default catch all but we should never get here
            default:
                return await stepContext.endDialog(callbackBotDetails);
        }
    }
    /**
     * Second Step
     *
     */
    async ConfirmCallbackDetailsStep(stepContext) {
        // Get the state machine from the last step
        const callbackBotDetails = stepContext.result;
        // debug
        // console.log('test ConfirmCallbackDetailsStep', callbackBotDetails)
        // Check if a master error occured and then end the dialog
        if (callbackBotDetails.masterError === true) {
            return await stepContext.endDialog(callbackBotDetails);
        }
        else {
            // If no master error occured continue on
            switch (callbackBotDetails.confirmCallbackDetailsStep) {
                // The previous step flag in the state machine isn't set
                // so we are sending the user to that step
                case null:
                    if (callbackBotDetails.confirmAuthWordStep === true) {
                        return await stepContext.beginDialog(confirmCallbackDetailsStep_1.CONFIRM_CALLBACK_DETAILS_STEP, callbackBotDetails);
                    }
                    else {
                        return await stepContext.endDialog(callbackBotDetails);
                    }
                // The confirmLookIntoStep flag in the state machine is set to true
                // so we are sending the user to next step
                case true:
                    return await stepContext.next();
                // The confirmLookIntoStep flag in the state machine is set to false
                // so we are sending to the end because they don't want to continue
                case false:
                    return await stepContext.endDialog(callbackBotDetails);
                // Default catch all but we should never get here
                default:
                    return await stepContext.endDialog(callbackBotDetails);
            }
        }
    }
    /**
     * Third Step
     *
     */
    async getUserPhoneNumberStep(stepContext) {
        // Get the state machine from the last step
        const callbackBotDetails = stepContext.result;
        // DEBUG
        // console.log('DEBUG getUserPhoneNumberStep:', callbackBotDetails, stepContext.result);
        // Check if a master error occured and then end the dialog
        if (callbackBotDetails.masterError === true) {
            return await stepContext.endDialog(callbackBotDetails);
        }
        else {
            // If no master error occured continue on
            switch (callbackBotDetails.getUserPhoneNumberStep) {
                // The confirmLookIntoStep flag in the state machine isn't set
                // so we are sending the user to that step
                case null:
                    if (callbackBotDetails.confirmCallbackStep) {
                        return await stepContext.beginDialog(getUserPhoneNumberStep_1.GET_USER_PHONE_NUMBER_STEP, callbackBotDetails);
                    }
                    else {
                        return await stepContext.endDialog(callbackBotDetails);
                    }
                // The confirmLookIntoStep flag in the state machine is set to true
                // so we are sending the user to next step
                case true:
                    // console.log('DEBUG', callbackBotDetails);
                    return await stepContext.next(callbackBotDetails);
                // The confirmLookIntoStep flag in the state machine is set to false
                // so we are sending to the end because they don't want to continue
                case false:
                    // code block
                    return await stepContext.endDialog(callbackBotDetails);
                // Default catch all but we should never get here
                default:
                    return await stepContext.endDialog(callbackBotDetails);
            }
        }
    }
    /**
     * Fourth Step
     *
     */
    async getPreferredCallbackDateAndTimeStep(stepContext) {
        // Get the state machine from the last step
        const callbackBotDetails = stepContext.result;
        // DEBUG
        // console.log('DEBUG: getAndSendEmailStep:', callbackBotDetails, stepContext.result);
        switch (callbackBotDetails.getPreferredCallbackDateAndTimeStep) {
            // The confirmNotifyROEReceivedStep flag in the state machine isn't set
            // so we are sending the user to that step
            case null:
                // ADD CHECKS TO SEE IF THE FIRST THREE STEPS ARE TRUE
                // IF ANY STEPS WERE FALSE OR ANYTHING ELSE THAN JUST END DIALOG
                return await stepContext.beginDialog(getPreferredCallbackDateAndTimeStep_1.GET_PREFERRED_CALLBACK_DATE_AND_TIME_STEP, callbackBotDetails);
            // The confirmNotifyROEReceivedStep flag in the state machine is set to true
            // so we are sending the user to next step
            case true:
                // console.log('DEBUG', callbackBotDetails);
                return await stepContext.next(callbackBotDetails);
            // The confirmNotifyROEReceivedStep flag in the state machine is set to false
            // so we are sending to the end because they need to hit the next step
            case false:
                // code block
                return await stepContext.endDialog(callbackBotDetails);
            // Default catch all but we should never get here
            default:
                return await stepContext.endDialog(callbackBotDetails);
        }
    }
    /**
     * Fifth Step
     *
     */
    async confirmAuthWordStep(stepContext) {
        // Get the state machine from the last step
        const callbackBotDetails = stepContext.result;
        // DEBUG
        // console.log('DEBUG: confirmAuthWordStep:', stepContext.result);
        switch (callbackBotDetails.confirmAuthWordStep) {
            // The GetPreferredMethodOfContactStep flag in the state machine isn't set
            // so we are sending the user to that step
            case null:
                if (callbackBotDetails.getPreferredCallbackDateAndTimeStep === true) {
                    return await stepContext.beginDialog(confirmAuthWordStep_1.CONFIRM_AUTH_WORD_STEP, callbackBotDetails);
                }
                else {
                    return await stepContext.endDialog(callbackBotDetails);
                }
            // The confirmNotifyROEReceivedStep flag in the state machine is set to true
            // so we are sending the user to next step
            case true:
                return await stepContext.next(callbackBotDetails);
            // The confirmNotifyROEReceivedStep flag in the state machine is set to false
            // so we are sending to the end because they need to hit the next step
            case false:
                // code block
                return await stepContext.endDialog(callbackBotDetails);
            // Default catch all but we should never get here
            default:
                return await stepContext.endDialog(callbackBotDetails);
        }
    }
    /**
     * Final step in the waterfall. This will end the callbackBot dialog
     */
    async finalStep(stepContext) {
        // Get the results of the last ran step
        const callbackBotDetails = stepContext.result;
        // DEBUG
        // console.log('DEBUG DETAILS: ', callbackBotDetails);
        // Check if a master error has occured
        if (callbackBotDetails.masterError === true) {
            const masterErrorMsg = i18nConfig_1.default.__('callbackBotDialogMasterErrorMsg');
            await stepContext.context.sendActivity(masterErrorMsg);
        }
        return await stepContext.endDialog(callbackBotDetails);
    }
}
exports.CallbackBotDialog = CallbackBotDialog;
//# sourceMappingURL=callbackBotDialog.js.map