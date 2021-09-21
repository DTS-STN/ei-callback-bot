"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const botbuilder_testing_1 = require("botbuilder-testing");
const assert = require('assert');
/**
 * An waterfall dialog derived from CancelAndHelpDialog for testing
 */
class TestMainDialog extends botbuilder_dialogs_1.ComponentDialog {
    constructor() {
        super('TestMainDialog');
        this.addDialog(new botbuilder_dialogs_1.TextPrompt('TextPrompt'))
            .addDialog(new botbuilder_dialogs_1.WaterfallDialog('WaterfallDialog', [
            this.promptStep.bind(this),
            this.finalStep.bind(this)
        ]));
        this.initialDialogId = 'WaterfallDialog';
    }
    async promptStep(stepContext) {
        return await stepContext.prompt('TextPrompt', { prompt: botbuilder_1.MessageFactory.text('Hi there') });
    }
    async finalStep(stepContext) {
        return await stepContext.endDialog();
    }
}
describe('MainDialog', () => {
    describe('Should be able to initial callback dialog', () => {
        const testCases = ['cancel', 'quit'];
        testCases.map((testData) => {
            it(testData, async () => {
                const sut = new TestMainDialog();
                const client = new botbuilder_testing_1.DialogTestClient('test', sut, null, [new botbuilder_testing_1.DialogTestLogger()]);
                // Execute the test case
                let reply = await client.sendActivity('Hi');
                assert.strictEqual(reply.text, 'Hi there');
                assert.strictEqual(client.dialogTurnResult.status, 'waiting');
                reply = await client.sendActivity(testData);
                assert.strictEqual(reply.text, 'Cancelling...');
                assert.strictEqual(client.dialogTurnResult.status, 'complete');
            });
        });
    });
    describe('Should be able to get rate step', () => {
        const testCases = ['help', '?'];
        testCases.map((testData) => {
            it(testData, async () => {
                const sut = new TestMainDialog();
                const client = new botbuilder_testing_1.DialogTestClient('test', sut, null, [new botbuilder_testing_1.DialogTestLogger()]);
                // Execute the test case
                let reply = await client.sendActivity('Hi');
                assert.strictEqual(reply.text, 'Hi there');
                assert.strictEqual(client.dialogTurnResult.status, 'waiting');
                reply = await client.sendActivity(testData);
                assert.strictEqual(reply.text, 'Show help here');
                assert.strictEqual(client.dialogTurnResult.status, 'waiting');
            });
        });
    });
});
//# sourceMappingURL=mainDialog.test.js.map