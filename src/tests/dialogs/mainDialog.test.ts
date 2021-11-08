import { Activity, MessageFactory } from 'botbuilder';
import {
  ComponentDialog,
  TextPrompt,
  WaterfallDialog,
  WaterfallStepContext,
} from 'botbuilder-dialogs';
import { DialogTestClient, DialogTestLogger } from 'botbuilder-testing';
import { MainDialog } from '../../dialogs/mainDialog';
import i18n from '../../dialogs/locales/i18nConfig';
const assert = require('assert');
import chai from 'chai';
import * as tsSinon from 'ts-sinon';
import {
  UnblockBotDialog,
  UNBLOCK_BOT_DIALOG,
} from '../../dialogs/unblockDialogs/unblockBotDialog';

chai.use(require('sinon-chai'));
import { expect } from 'chai';
/**
 * An waterfall dialog derived from MainDialog for testing
 */

describe('MainDialog', () => {
  describe('Should be able to initial callback dialog', () => {
    // const testCases = require('./testData/MainDialogTestData');
    const sut = new MainDialog();
    sut.addDialog(new UnblockBotDialog());

    // Create array with test case data.
    const standardMsg = i18n.__('confirmSendEmailStepStandardMsg');
    const firstMsg = i18n.__('unBlockBotDialogWelcomeMsg');
    const secondMsg = i18n.__('confirmLookIntoStepStandardMsg');
    const leaveMsg = i18n.__('confirmCallbackStepCloseMsg');
    const testCases = [
      {
        utterance: 'Yes, please',
        intent: 'go to unblock dialog',
        initialData: {
          masterError: null,
          // [STEP 1] Flag that confirms the user wants us to look into their file
          // [STEP 1] Flag that confirms the user wants us to look into their file
          confirmLookIntoStep: null,

          // [STEP 2] Flag that confirms the user wants us to send an email
          // [STEP 2] Flag that confirms the user wants us to send an email
          confirmSendEmailStep: null,

          // [STEP 3] Get and send an email
          getAndSendEmailStep: null,

          // [STEP 4] Determine if the user wants to be notified
          confirmNotifyROEReceivedStep: null,

          // [STEP 5] Get preferred method of contact
          getPreferredMethodOfContactStep: null,

          errorCount: {
            confirmLookIntoStep: 0,
            confirmSendEmailStep: 0,
            getAndSendEmailStep: 0,
            confirmNotifyROEReceivedStep: 0,
            getPreferredMethodOfContactStep: 0,
          },
        },
        invokedDialogResponse: 'mainDialog mock invoked',
        taskConfirmationMessage: standardMsg,
      },
      {
        utterance: 'No,thanks',
        intent: 'Leave the dialog',
        initialData: {},
        invokedDialogResponse: ``,
        taskConfirmationMessage: leaveMsg,
      },
    ];
    testCases.map((testData) => {
      it(testData.intent, async () => {
        const client = new DialogTestClient('test', sut, null, [
          new DialogTestLogger(),
        ]);

        // Execute the test case
        let updatedActivity: Partial<Activity> = {
          text: '',
          locale: 'en',
        };
        let reply = await client.sendActivity(updatedActivity);
        expect(reply.text).to.be.equal(firstMsg);

        let secondReply = client.getNextReply();
        expect(secondReply.text).to.be.equal(
          secondMsg + ' (1) Yes please! or (2) No thanks',
        );
        let realReply = await client.sendActivity(testData.utterance);

        const initialStep = tsSinon.default.spy(sut.initialStep);

        //expect(realReply.text).to.be.equal('testData.taskConfirmationMessage');
        expect(initialStep).to.have.been.calledOnce;

        // reply = await client.sendActivity(testData.invokedDialogResponse);
        //   assert.strictEqual(reply.text, 'Cancelling...');
        //   assert.strictEqual(client.dialogTurnResult.status, 'complete');
      });
    });
  });

  describe('Should be able to get rate step', () => {
    const leaveMsg = i18n.__('mainDialogFeedbackMsg');
    const testCases = [
      {
        utterance: '1',
        intent: 'None',
        name: ' test rate Step',
        invokedDialogResponse: ``,
        taskConfirmationMessage: leaveMsg,
      },
    ];

    testCases.map((testData) => {
      const sut = new MainDialog();
      const client = new DialogTestClient('test1', sut, null, [
        new DialogTestLogger(console),
      ]);
      it(testData.name, async () => {
        // const stepContext: WaterfallStepContext = {};
        //  sut.rateStep(stepContext);
        // Execute the test case
        let reply = await client.getNextReply();
        //reply = await client.sendActivity(testData.utterance);
        //  assert.strictEqual(reply.text, '');
        //  assert.strictEqual(client.dialogTurnResult.status, 'waiting');
      });
    });
  });
});
