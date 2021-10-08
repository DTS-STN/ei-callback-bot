import {
    ComponentDialog,
    TextPrompt,
    WaterfallDialog,
    WaterfallStepContext
} from 'botbuilder-dialogs';

import { ConfirmCallbackStep, CONFIRM_CALLBACK_STEP } from './confirmCallbackStep';
import { GetUserPhoneNumberStep, GET_USER_PHONE_NUMBER_STEP } from './getUserPhoneNumberStep';
import { ConfirmAuthWordStep, CONFIRM_AUTH_WORD_STEP } from './confirmAuthWordStep';
import { GetPreferredCallbackDateAndTimeStep, GET_PREFERRED_CALLBACK_DATE_AND_TIME_STEP } from './getPreferredCallbackDateAndTimeStep';
import { ConfirmCallbackDetailsStep, CONFIRM_CALLBACK_DETAILS_STEP } from './confirmCallbackDetailsStep';
// This is for the i18n stuff
import   i18n from './locales/i18nConfig';
import { CallbackBotDetails } from './callbackBotDetails';
import { StatePropertyAccessor,UserState } from 'botbuilder';
import {  ConfirmEmailStep, CONFIRM_EMAIL_STEP } from './confirmEmailStep';
import { GetPreferredMethodOfContactStep, GET_PREFERRED_METHOD_OF_CONTACT_STEP } from './getPreferredMethodOfContactStep';
import { ConfirmPhoneStep, CONFIRM_PHONE_STEP } from './confirmPhoneStep';

export const CALLBACK_BOT_DIALOG = 'CALLBACK_BOT_DIALOG';
const MAIN_CALLBACK_BOT_WATERFALL_DIALOG = 'MAIN_CALLBACK_BOT_WATERFALL_DIALOG';
const CALLBACK_BOT_DETAILS = 'CALLBACK_BOT_DETAILS';
export class CallbackBotDialog extends ComponentDialog {

    constructor(id? :string) {
        super(id ||CALLBACK_BOT_DIALOG);

        // Add the ConfirmLookIntoStep dialog to the dialog stack
        this.addDialog(new ConfirmCallbackStep());
       // this.addDialog(new ConfirmConfirmationStep());
        this.addDialog(new GetPreferredMethodOfContactStep());
        this.addDialog(new ConfirmEmailStep());
        this.addDialog(new ConfirmPhoneStep());
       // this.addDialog(new GetUserPhoneNumberStep());
       // this.addDialog(new GetPreferredCallbackDateAndTimeStep());
        this.addDialog(new ConfirmAuthWordStep());
       // this.addDialog(new ConfirmCallbackDetailsStep());

        this.addDialog(new WaterfallDialog(MAIN_CALLBACK_BOT_WATERFALL_DIALOG, [
            this.welcomeStep.bind(this),
            this.confirmCallbackStep.bind(this),
           // this.confirmConfirmationStep.bind(this),
            this.getPreferredMethodOfContactStep.bind(this),
            this.confirmEmailStep.bind(this),
            this.confirmPhoneStep.bind(this),
         //   this.getUserPhoneNumberStep.bind(this),
          //  this.getPreferredCallbackDateAndTimeStep.bind(this),
            this.confirmAuthWordStep.bind(this),
            // this.ConfirmCallbackDetailsStep.bind(this),
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
    async welcomeStep(stepContext: WaterfallStepContext) {
        // Get the callback Bot details / state machine for the current user
         const callbackBotDetails = stepContext.options;

       // const welcomeMsg = i18n.__('callbackBotDialogWelcomeMsg');

        // await stepContext.context.sendActivity(welcomeMsg);

        return await stepContext.next(callbackBotDetails);

    }

    /*
     * Initial step in the waterfall. This will kick of the callback bot dialog
     * Most of the time this will just kick off the CONFIRM_CALLBACK_STEP dialog -
     * But in the off chance that the bot has already run through the switch statement
     * will take care of edge cases
     */
    async confirmCallbackStep(stepContext: WaterfallStepContext) {
        // Get the state machine from the last step
        const callbackBotDetails = stepContext.result;

        // DEBUG
        // console.log('DEBUG: confirmCallbackStep:', callbackBotDetails);

        switch (callbackBotDetails.confirmCallbackStep) {

        // The confirmLookIntoStep flag in the state machine isn't set
        // so we are sending the user to that step
        case null:
            return await stepContext.beginDialog(CONFIRM_CALLBACK_STEP, callbackBotDetails);

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
    async ConfirmCallbackDetailsStep(stepContext: WaterfallStepContext<CallbackBotDetails>) {
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
                    return await stepContext.beginDialog(CONFIRM_CALLBACK_DETAILS_STEP, callbackBotDetails);
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





    async confirmPhoneStep(stepContext) {
    // Get the state machine from the last step
    const callbackBotDetails = stepContext.result;

    // DEBUG
    // console.log('DEBUG: getAndSendEmailStep:', unblockBotDetails, stepContext.result);
    if (callbackBotDetails.masterError) {
      return await stepContext.endDialog(callbackBotDetails);
    } else {
      switch (callbackBotDetails.confirmPhoneStep) {
        // The confirmNotifyROEReceivedStep flag in the state machine isn't set
        // so we are sending the user to that step
        case null:
          // ADD CHECKS TO SEE IF THE FIRST THREE STEPS ARE TRUE
          // IF ANY STEPS WERE FALSE OR ANYTHING ELSE THAN JUST END DIALOG
          return await stepContext.beginDialog(
            CONFIRM_PHONE_STEP,
            callbackBotDetails
          );

        // The confirmNotifyROEReceivedStep flag in the state machine is set to true
        // so we are sending the user to next step
        case true:
          // console.log('DEBUG', unblockBotDetails);
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
                if (callbackBotDetails.confirmCallbackStep ) {
                    return await stepContext.beginDialog(GET_USER_PHONE_NUMBER_STEP, callbackBotDetails);
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
            return await stepContext.beginDialog(GET_PREFERRED_CALLBACK_DATE_AND_TIME_STEP, callbackBotDetails);

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
            if (callbackBotDetails.confirmEmailStep === true || callbackBotDetails.confirmPhoneStep === true) {
                return await stepContext.beginDialog(CONFIRM_AUTH_WORD_STEP, callbackBotDetails);
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

    async confirmEmailStep(stepContext) {
        // Get the state machine from the last step
        const callbackBotDetails = stepContext.result;

        // DEBUG
        // console.log('DEBUG: getAndSendEmailStep:', unblockBotDetails, stepContext.result);
        if (callbackBotDetails.masterError) {
          return await stepContext.endDialog(callbackBotDetails);
        } else {
          switch (callbackBotDetails.confirmEmailStep) {
            // The confirmNotifyROEReceivedStep flag in the state machine isn't set
            // so we are sending the user to that step
            case null:
              // ADD CHECKS TO SEE IF THE FIRST THREE STEPS ARE TRUE
              // IF ANY STEPS WERE FALSE OR ANYTHING ELSE THAN JUST END DIALOG
              return await stepContext.beginDialog(
                CONFIRM_EMAIL_STEP,
                callbackBotDetails
              );

            // The confirmNotifyROEReceivedStep flag in the state machine is set to true
            // so we are sending the user to next step
            case true:
              // console.log('DEBUG', unblockBotDetails);
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
      }
    async getPreferredMethodOfContactStep(stepContext) {
 // Get the state machine from the last step
 const callbackBotDetails = stepContext.result;

 // DEBUG
 // console.log('DEBUG: getAndSendEmailStep:', unblockBotDetails, stepContext.result);

 switch (callbackBotDetails.getPreferredMethodOfContactStep) {
   // The GetPreferredMethodOfContactStep flag in the state machine isn't set
   // so we are sending the user to that step
   case null:
     if (callbackBotDetails.confirmCallbackStep === true) {
       return await stepContext.beginDialog(
         GET_PREFERRED_METHOD_OF_CONTACT_STEP,
         callbackBotDetails
       );
     } else {
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
            const masterErrorMsg = i18n.__('callbackBotDialogMasterErrorMsg');

            await stepContext.context.sendActivity(masterErrorMsg);
        }

        return await stepContext.endDialog(callbackBotDetails);
    }
}

