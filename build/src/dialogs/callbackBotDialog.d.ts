import { ComponentDialog, WaterfallStepContext } from 'botbuilder-dialogs';
import { CallbackBotDetails } from './callbackBotDetails';
export declare const CALLBACK_BOT_DIALOG = "CALLBACK_BOT_DIALOG";
export declare class CallbackBotDialog extends ComponentDialog {
    constructor(id?: string);
    /**
     * Initial step in the waterfall. This will kick of the callbackBot dialog
     * Most of the time this will just kick off the CONFIRM_LOOK_INTO_STEP dialog -
     * But in the off chance that the bot has already run through the switch statement
     * will take care of edge cases
     */
    welcomeStep(stepContext: WaterfallStepContext): Promise<import("botbuilder-dialogs").DialogTurnResult<any>>;
    confirmCallbackStep(stepContext: WaterfallStepContext): Promise<import("botbuilder-dialogs").DialogTurnResult<any>>;
    /**
     * Second Step
     *
     */
    ConfirmCallbackDetailsStep(stepContext: WaterfallStepContext<CallbackBotDetails>): Promise<import("botbuilder-dialogs").DialogTurnResult<any>>;
    /**
     * Third Step
     *
     */
    getUserPhoneNumberStep(stepContext: any): Promise<any>;
    /**
     * Fourth Step
     *
     */
    getPreferredCallbackDateAndTimeStep(stepContext: any): Promise<any>;
    /**
     * Fifth Step
     *
     */
    confirmAuthWordStep(stepContext: any): Promise<any>;
    /**
     * Final step in the waterfall. This will end the callbackBot dialog
     */
    finalStep(stepContext: any): Promise<any>;
}
