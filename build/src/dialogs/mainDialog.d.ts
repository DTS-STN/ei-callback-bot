import { ComponentDialog, DialogTurnResult, WaterfallStepContext, DialogState } from 'botbuilder-dialogs';
import { TurnContext, StatePropertyAccessor } from 'botbuilder';
export declare class MainDialog extends ComponentDialog {
    constructor();
    /**
     * The run method handles the incoming activity (in the form of a TurnContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {*} turnContext
     * @param {*} accessor
     */
    run(turnContext: TurnContext, accessor: StatePropertyAccessor<DialogState>): Promise<void>;
    /**
     * Initial step in the waterfall. This will kick of the callbackBot dialog
     */
    initialStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult>;
    /**
     * Initial step in the waterfall. This will kick of the callbackBot dialog
     */
    rateStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult>;
    /**
     * This is the final step in the main waterfall dialog.
     */
    finalStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult>;
}
