import { ComponentDialog } from 'botbuilder-dialogs';
export declare const CONFIRM_AUTH_WORD_STEP = "CONFIRM_AUTH_WORD_STEP";
export declare class ConfirmAuthWordStep extends ComponentDialog {
    constructor();
    /**
     * Kick off the dialog by asking for an email address
     *
     */
    initialStep(stepContext: any): Promise<any>;
    /**
     *
     *
     */
    finalStep(stepContext: any): Promise<any>;
    private generateAuthCode;
}
