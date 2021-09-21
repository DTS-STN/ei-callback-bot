"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const botbuilder_1 = require("botbuilder");
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const virtualAssistantCallbackBot_1 = require("../../bots/virtualAssistantCallbackBot");
const assert = require('assert');
/**
 * A simple mock for a root dialog that gets invoked by the bot.
 */
class MockRootDialog extends botbuilder_dialogs_1.Dialog {
    constructor() {
        super('mockRootDialog');
    }
    async beginDialog(dc, options) {
        await dc.context.sendActivity(`${this.id} mock invoked`);
        return await dc.endDialog();
    }
    async run(turnContext, accessor) {
        const dialogSet = new botbuilder_dialogs_1.DialogSet(accessor);
        dialogSet.add(this);
        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        if (results.status === botbuilder_dialogs_1.DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }
}
describe('CallbackBot', () => {
    const testAdapter = new botbuilder_1.TestAdapter(async (context) => undefined);
    async function processActivity(activity, bot) {
        const context = new botbuilder_1.TurnContext(testAdapter, activity);
        await bot.run(context);
    }
    it('Shows welcome card on member added and starts main dialog', async () => {
        const mockRootDialog = new MockRootDialog();
        const memoryStorage = new botbuilder_1.MemoryStorage();
        const conversationState = new botbuilder_1.ConversationState(memoryStorage);
        const dialogs = new botbuilder_dialogs_1.DialogSet(conversationState.createProperty('DialogState'));
        dialogs.add(mockRootDialog);
        const sut = new virtualAssistantCallbackBot_1.VirtualAssistantCallbackBot(new botbuilder_1.ConversationState(memoryStorage), new botbuilder_1.UserState(memoryStorage), dialogs);
        // Create conversationUpdate activity
        const conversationUpdateActivity = {
            channelId: 'test',
            conversation: {
                id: 'someId'
            },
            membersAdded: [
                { id: 'theUser' }
            ],
            recipient: { id: 'theBot' },
            type: botbuilder_1.ActivityTypes.ConversationUpdate
        };
        // Send the conversation update activity to the bot.
        await processActivity(conversationUpdateActivity, sut);
        // Assert we got the welcome card
        let reply = testAdapter.activityBuffer.shift();
        assert.strictEqual(reply.text, 'Hi Mary, I’m your virtual concierge!');
        reply = testAdapter.activityBuffer.shift();
        assert.strictEqual(reply.text, ' Do you want to our agent contact you later? (1) Yes please! or (2) No thanks');
        // Assert that we started the main dialog.
        reply = testAdapter.activityBuffer.shift();
        assert.strictEqual(reply.text, 'mockRootDialog mock invoked');
    });
});
//# sourceMappingURL=virtualAssistantCallbackBot.test.js.map