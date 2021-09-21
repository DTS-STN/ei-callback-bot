import { ActivityHandler, BotState } from 'botbuilder';
import { DialogSet } from 'botbuilder-dialogs';
export declare class VirtualAssistantCallbackBot extends ActivityHandler {
    private conversationState;
    private userState;
    private dialog;
    private dialogSet;
    private dialogState;
    constructor(conversationState: BotState, userState: BotState, dialogSet: DialogSet);
    addDialogs(): void;
    /**
     * Override the ActivityHandler.run() method to save state changes after the bot logic completes.
     */
    run(context: any): Promise<void>;
}
