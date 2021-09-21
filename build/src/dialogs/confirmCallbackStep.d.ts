import { ComponentDialog, WaterfallStepContext } from 'botbuilder-dialogs';
export declare const CONFIRM_CALLBACK_STEP = "CONFIRM_CALLBACK_STEP";
export declare class ConfirmCallbackStep extends ComponentDialog {
    constructor();
    preStep(stepContext: WaterfallStepContext): Promise<import("botbuilder-dialogs").DialogTurnResult<any>>;
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
    initialStep(stepContext: any): Promise<any>;
    /**
     * Validation step in the waterfall.
     * We use LUIZ to process the prompt reply and then
     * update the state machine (callbackBotDetails)
     */
    finalStep(stepContext: any): Promise<any>;
}
