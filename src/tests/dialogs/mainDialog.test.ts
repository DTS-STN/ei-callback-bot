import { Activity, MessageFactory } from 'botbuilder';
import {
  ComponentDialog,
  TextPrompt,
  WaterfallDialog,
  WaterfallStepContext,
} from 'botbuilder-dialogs';
import { DialogTestClient, DialogTestLogger } from 'botbuilder-testing';
import { MainDialog } from '../../dialogs/mainDialog';
import { i18n } from '../../dialogs/locales/i18nConfig';
const assert = require('assert');
import chai from 'chai';
import * as tsSinon from 'ts-sinon';
import {
  UnblockBotDialog,
  UNBLOCK_BOT_DIALOG,
} from '../../dialogs/unblockDialogs/unblockBotDialog';

chai.use(require('sinon-chai'));
import { expect } from 'chai';
import { UnblockRecognizer } from '../../dialogs/unblockDialogs/unblockRecognizer';
import { ConfirmLookIntoStep } from '../../dialogs/unblockDialogs/confirmLookIntoStep';
/**
 * An waterfall dialog derived from MainDialog for testing
 */

describe('MainDialog', () => {
  describe('Should be able to initial callback dialog', () => {
    // const testCases = require('./testData/MainDialogTestData');
    const sut = new MainDialog();
    const unblockBotDialog = new UnblockBotDialog();

    const confirmLookInto = new ConfirmLookIntoStep();
    sut.addDialog(unblockBotDialog);
    unblockBotDialog.addDialog(confirmLookInto);
    afterEach(function () {
      tsSinon.default.restore();
    });

    const standardMsg = i18n.__('confirmSendEmailStepStandardMsg');
    const firstMsg = i18n.__('unBlockBotDialogWelcomeMsg');
    const secondMsg = i18n.__('confirmLookIntoStepStandardMsg');
    const leaveMsg = i18n.__('confirmCallbackStepCloseMsg');
    const closeMsg = i18n.__('confirmLookIntoStepCloseMsg');
    // Create array with test case data.
    const testCases = [
      {
        utterance: 'Yes, please',
        intent: 'go to unblock dialog',
        name: 'initial unblock dialog',
        initialData: {
          locale: 'en',
          masterError: null,
          confirmLookIntoStep: false,

          confirmSendEmailStep: null,

          getAndSendEmailStep: null,

          confirmNotifyROEReceivedStep: null,

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
        name: 'Leave the dialog',
        initialData: {
          locale: 'en',
        },
        invokedDialogResponse: ``,
        taskConfirmationMessage: leaveMsg,
      },
    ];
    testCases.map((testData) => {
      it(testData.name, async () => {
        const client = new DialogTestClient('test', sut, testData.initialData, [
          new DialogTestLogger(),
        ]);
        tsSinon.default
          .stub(UnblockRecognizer.prototype, 'executeLuisQuery')
          .callsFake(() =>
            JSON.parse(
              `{"intents": {"${testData.intent}": {"score": 1}}, "entities": {"$instance": {}}}`,
            ),
          );
        /*  tsSinon.default
          .stub(unblockBotDialog, 'welcomeStep')
          .callsFake(() => Promise.resolve('welcomeStep called'));

        tsSinon.default
          .stub(confirmLookInto, 'initialStep')
          .callsFake(() => Promise.resolve('initialStep called'));

        tsSinon.default
          .stub(confirmLookInto, 'finalStep')
          .callsFake(() => Promise.resolve('finalStep called')); */
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

        //const initialStepFunc = tsSinon.default.spy(sut, 'initialStep');
        // const runFunc = tsSinon.default.spy(sut, 'run');
        // const unblockBotWelcomeStep = tsSinon.default.spy(unblockBotDialog);
        // const confirmLookIntoInitialStep = tsSinon.default.spy(confirmLookInto);
        // const confirmLookIntoFinalStep = tsSinon.default.spy(confirmLookInto);
        //expect(realReply.text).to.be.equal('testData.taskConfirmationMessage');
        // expect(sut.initialStep).to.have.been.called;
        //  expect(runFunc).to.have.been.called;
        //expect(unblockBotDialog.welcomeStep).to.have.been.calledOnce;
        // expect(confirmLookInto.initialStep).to.have.been.calledOnce;
        //  expect(confirmLookInto.finalStep).to.have.been.calledOnce;
        // reply = await client.sendActivity(testData.invokedDialogResponse);
        //   assert.strictEqual(reply.text, 'Cancelling...');
        //   assert.strictEqual(client.dialogTurnResult.status, 'complete');
      });
    });
  });

  describe('Should be able to get rate step', () => {
    const leaveMsg = i18n.__('mainDialogFeedbackMsg');
    const standardMsg = i18n.__('confirmSendEmailStepStandardMsg');
    const firstMsg = i18n.__('unBlockBotDialogWelcomeMsg');
    const secondMsg = i18n.__('confirmLookIntoStepStandardMsg');
    const closeMsg = i18n.__('confirmLookIntoStepCloseMsg');
    const testCases = [
      {
        utterance: '1',
        intent: 'promptConfirmNo',
        initialData: {
          masterError: null,
          confirmLookIntoStep: false,
          confirmSendEmailStep: null,
          getAndSendEmailStep: null,
          confirmNotifyROEReceivedStep: null,
          getPreferredMethodOfContactStep: null,
          errorCount: {
            confirmLookIntoStep: 0,
            confirmSendEmailStep: 0,
            getAndSendEmailStep: 0,
            confirmNotifyROEReceivedStep: 0,
            getPreferredMethodOfContactStep: 0,
          },
        },
        name: 'test rate Step',
        invokedDialogResponse: ``,
        taskConfirmationMessage: leaveMsg,
      },
    ];
    const sut = new MainDialog();
    sut.addDialog(new UnblockBotDialog());
    afterEach(function () {
      tsSinon.default.restore();
    });
    testCases.map((testData) => {
      it(testData.name, async () => {
        const client = new DialogTestClient(
          'test1',
          sut,
          testData.initialData,
          [new DialogTestLogger(console)],
        );
        tsSinon.default
          .stub(UnblockRecognizer.prototype, 'executeLuisQuery')
          .callsFake(() =>
            JSON.parse(
              `{"intents": {"${testData.intent}": {"score": 1}}, "entities": {"$instance": {}}}`,
            ),
          );
        // const stepContext: WaterfallStepContext = {};
        //  sut.rateStep(stepContext);
        // Execute the test case
        // let reply = await client.getNextReply();
        let updatedActivity: Partial<Activity> = {
          text: '',
          locale: 'en',
        };
        let reply = await client.sendActivity(updatedActivity);

        assert.strictEqual(reply.text, firstMsg);
        let secondReply = client.getNextReply();
        expect(secondReply.text).to.be.equal(
          secondMsg + ' (1) Yes please! or (2) No thanks',
        );
        updatedActivity = {
          text: 'no thanks',
          locale: 'en',
        };
        let thirdReply = await client.sendActivity(updatedActivity);

        assert.strictEqual(thirdReply.text, closeMsg);
        //  assert.strictEqual(client.dialogTurnResult.status, 'waiting');
      });
    });
  });
});
