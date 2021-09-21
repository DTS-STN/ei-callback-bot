import {
    TextPrompt,
    ComponentDialog,
    WaterfallDialog
} from 'botbuilder-dialogs';

// This is for the i18n stuff
import   i18n from './locales/i18nConfig';

const TEXT_PROMPT = 'TEXT_PROMPT';
export const CONFIRM_AUTH_WORD_STEP = 'CONFIRM_AUTH_WORD_STEP';
const CONFIRM_AUTH_WORD_WATERFALL_STEP = 'CONFIRM_AUTH_WORD_WATERFALL_STEP';

const MAX_ERROR_COUNT = 3;

export class ConfirmAuthWordStep extends ComponentDialog {
    constructor() {
        super(CONFIRM_AUTH_WORD_STEP);

        // Add a text prompt to the dialog stack
        this.addDialog(new TextPrompt(TEXT_PROMPT));

        this.addDialog(new WaterfallDialog(CONFIRM_AUTH_WORD_WATERFALL_STEP, [
            this.initialStep.bind(this),
            this.finalStep.bind(this)
        ]));

        this.initialDialogId = CONFIRM_AUTH_WORD_WATERFALL_STEP;
    }

    /**
     * Kick off the dialog by asking for an email address
     *
     */
    async initialStep(stepContext) {
        // Get the user details / state machine
        const callbackBotDetails = stepContext.options;

        // debug
       // console.log('test authword step')
         // Set the text for the prompt
         const standardMsg = i18n.__('confirmAuthWordStepStandardMsg');

        // Check if the error count is greater than the max threshold
        if (callbackBotDetails.errorCount.confirmAuthWordStep >= MAX_ERROR_COUNT) {
            // Throw the master error flag
            callbackBotDetails.masterError = true;
            // End the dialog and pass the updated details state machine
            return await stepContext.endDialog(callbackBotDetails);
        }

        // Check the user state to see if callbackBotDetails.getAndSendEmailStep is set to null or -1
        // If it is in the error state (-1) or or is set to null prompt the user
        // If it is false the user does not want to proceed
        if (callbackBotDetails.confirmAuthWordStep === null || callbackBotDetails.confirmAuthWordStep === -1) {
            // Setup the prompt message
            const authCode = this.generateAuthCode();
            callbackBotDetails.authCode =authCode;
               const promptMsg = standardMsg + ' '+ authCode ;

             await stepContext.context.sendActivity(promptMsg);

            return await stepContext.next(callbackBotDetails);
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

        // Result has come through
        if (stepContext.result) {
            const confirmMsg = i18n.__('confirmAuthWordMsg');
            callbackBotDetails.confirmAuthWordStep = true;
            await stepContext.context.sendActivity(confirmMsg);

            return await stepContext.endDialog(callbackBotDetails);
        }
        // No result provided
        else {
            callbackBotDetails.confirmAuthWordStep = -1;
            callbackBotDetails.errorCount.confirmAuthWordStep++;

            return await stepContext.replaceDialog(CONFIRM_AUTH_WORD_STEP, callbackBotDetails);
        }
    }

  private  generateAuthCode() {
        return Math.floor(1000 + Math.random() * 9000);
    }
}

