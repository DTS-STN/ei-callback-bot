
import { MessageFactory } from 'botbuilder';
import { ComponentDialog, TextPrompt, WaterfallDialog } from 'botbuilder-dialogs';
import { DialogTestClient, DialogTestLogger } from 'botbuilder-testing';
import { MainDialog } from '../../dialogs/mainDialog';
import  i18n  from "../../dialogs/locales/i18nConfig";
const assert = require('assert');

/**
 * An waterfall dialog derived from MainDialog for testing
 */


describe('MainDialog', () => {
    describe('Should be able to initial callback dialog', () => {
       // const testCases = require('./testData/MainDialogTestData');
        const sut = new MainDialog();
      // Create array with test case data.
      const testCases = [
        { utterance: 'Yes, please', intent: '', invokedDialogResponse: 'mainDialog mock invoked', taskConfirmationMessage: 'I have you booked to Seattle from New York' },
        { utterance: 'bananas', intent: 'None', invokedDialogResponse: ``, taskConfirmationMessage: undefined }
    ];
        testCases.map((testData) => {
            it(testData.intent, async () => {

                const client = new DialogTestClient('test', sut, null, [new DialogTestLogger()]);

                // Execute the test case
                console.log('test 2',client.conversationState)
                console.log('test 3',client.dialogTurnResult.result)
                const standardMsg = i18n.__("confirmSendEmailStepStandardMsg");
                let reply = await client.sendActivity('Yes Please!');
                assert.strictEqual(reply.text, standardMsg);
                assert.strictEqual(client.dialogTurnResult.status, 'waiting');

                reply = await client.sendActivity(testData.invokedDialogResponse);
                assert.strictEqual(reply.text, 'Cancelling...');
                assert.strictEqual(client.dialogTurnResult.status, 'complete');
            });
        });
    });

    describe('Should be able to get rate step', () => {
        const testCases = ['', '?'];

        testCases.map((testData) => {
            it(testData, async () => {
                const sut = new MainDialog();
                const client = new DialogTestClient('test', sut, null, [new DialogTestLogger()]);

                // Execute the test case
                let reply = await client.sendActivity('Yes Please!');
                assert.strictEqual(reply.text, 'Hi there');
                assert.strictEqual(client.dialogTurnResult.status, 'waiting');

                reply = await client.sendActivity(testData);
                assert.strictEqual(reply.text, 'Show help here');
                assert.strictEqual(client.dialogTurnResult.status, 'waiting');
            });
        });
    });
});