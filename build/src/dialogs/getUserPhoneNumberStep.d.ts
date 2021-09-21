import { ComponentDialog, WaterfallStepContext } from 'botbuilder-dialogs';
import { CallbackBotDetails } from './callbackBotDetails';
export declare const GET_USER_PHONE_NUMBER_STEP = "GET_USER_PHONE_NUMBER_STEP";
export declare class GetUserPhoneNumberStep extends ComponentDialog {
    constructor();
    /**
     * Kick off the dialog by asking for an email address
     *
     */
    initialStep(stepContext: WaterfallStepContext): Promise<import("botbuilder-dialogs").DialogTurnResult<any>>;
    /**
     *
     *
     */
    finalStep(stepContext: WaterfallStepContext<CallbackBotDetails>): Promise<import("botbuilder-dialogs").DialogTurnResult<any>>;
}
