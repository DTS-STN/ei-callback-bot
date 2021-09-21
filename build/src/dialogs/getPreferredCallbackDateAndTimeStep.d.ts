import { ComponentDialog, WaterfallStepContext } from 'botbuilder-dialogs';
import { CallbackBotDetails } from './callbackBotDetails';
export declare const GET_PREFERRED_CALLBACK_DATE_AND_TIME_STEP = "GET_PREFERRED_CALLBACK_DATE_AND_TIME_STEP";
export declare class GetPreferredCallbackDateAndTimeStep extends ComponentDialog {
    constructor();
    /**
     * Initial step in the waterfall. This will kick of the ConfirmLookIntoStep step
     *
     * If the confirmSendEmailStep flag is set in the state machine then we can just
     * end this whole dialog
     *
     * If the confirmLookIntoStep flag is set to null then we need to get a response from the user
     *
     * If the user errors out then we're going to set the flag to false and assume they can't / don't
     * want to proceed
     */
    initialStep(stepContext: any): Promise<any>;
    dateStep(stepContext: WaterfallStepContext<CallbackBotDetails>): Promise<import("botbuilder-dialogs").DialogTurnResult<any>>;
    timeStep(stepContext: WaterfallStepContext<CallbackBotDetails>): Promise<import("botbuilder-dialogs").DialogTurnResult<any>>;
    /**
     * Validation step in the waterfall.
     * We use LUIZ to process the prompt reply and then
     * update the state machine (callbackBotDetails)
     */
    finalStep(stepContext: WaterfallStepContext<CallbackBotDetails>): Promise<import("botbuilder-dialogs").DialogTurnResult<any>>;
}
