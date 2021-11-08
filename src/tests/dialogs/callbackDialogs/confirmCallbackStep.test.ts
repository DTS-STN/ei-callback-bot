import { DialogTestClient, DialogTestLogger } from 'botbuilder-testing';

import { CallbackRecognizer } from '../../../dialogs/calllbackDialogs/callbackRecognizer';
import { GetPreferredMethodOfContactStep } from '../../../dialogs/getPreferredMethodOfContactStep';
const assert = require('assert');
import chai from 'chai';
import * as tsSinon from 'ts-sinon';

import { Activity } from 'botbuilder';
import { ConfirmEmailStep } from '../../../dialogs/confirmEmailStep';
import { ConfirmCallbackPhoneNumberStep } from '../../../dialogs/confirmCallbackPhoneNumberStep';
import {
  GetUserPhoneNumberStep,
  GET_USER_PHONE_NUMBER_STEP,
} from '../../../dialogs/getUserPhoneNumberStep';
import { ConfirmCallbackStep } from '../../../dialogs/confirmCallbackStep';
chai.use(require('sinon-chai'));
import { expect } from 'chai';
describe('ConfirmCallbackStep', () => {
  const testCases = require('../../testData/confirmCallbackStepTestData');
  const sut = new ConfirmCallbackStep();

  afterEach(function () {
    tsSinon.default.restore();
  });
  testCases.map((testData) => {
    it(testData.name, async () => {
      const client = new DialogTestClient('test', sut, testData.initialData, [
        new DialogTestLogger(console),
      ]);

      tsSinon.default
        .stub(CallbackRecognizer.prototype, 'executeLuisQuery')
        .callsFake(() =>
          JSON.parse(
            `{"intents": {"${testData.intent}": {"score": 1}}, "entities": {"$instance": {}}}`,
          ),
        );
      if (testData.intent === 'InitialDialog') {
        let updatedActivity: Partial<Activity> = {
          text: testData.steps[0][0],
          locale: 'en',
        };
        const replyFirst = await client.sendActivity(updatedActivity);

        const replySecond = client.getNextReply();
        assert.strictEqual(
          replyFirst ? replyFirst.text : null,
          testData.steps[0][1],
          `${replyFirst ? replyFirst.text : null} != ${testData.steps[0][1]}`,
        );
        assert.strictEqual(
          replySecond ? replySecond.text : null,
          testData.steps[1][1],
          `${replySecond ? replySecond.text : null} != ${testData.steps[1][1]}`,
        );
        let updateAgainActivity: Partial<Activity> = {
          text: testData.steps[2][0],
          locale: 'en',
        };
      } else {
        // Execute the test case
        console.log(`Test Case: ${testData.name}`);
        console.log(`Dialog Input ${testData.initialData}`);

        for (const step of testData.steps) {
          let updatedActivity: Partial<Activity> = {
            text: step[0],
            locale: 'en',
          };

          if (testData.intent === 'promptConfirmYes') {
            const reply = await client.sendActivity(updatedActivity);
            const endDialog = tsSinon.default.spy(
              client.dialogContext.endDialog,
            );
            if (step[0] === 'Yes, please!') {
              expect(client.dialogTurnResult, 'waiting');
              // TODO: find a way to test replace dialog
              // expect(endDialog).to.have.been.calledOnce;
            }
          } else {
            const reply = await client.sendActivity(updatedActivity);

            assert.strictEqual(
              reply ? reply.text : null,
              step[1],
              `${reply ? reply.text : null} != ${step[1]}`,
            );
          }
        }
      }

      console.log(`Dialog result: ${client.dialogTurnResult.result}`);
      assert.strictEqual(
        client.dialogTurnResult.result,
        testData.expectedResult,
        `${testData.expectedResult} != ${client.dialogTurnResult.result}`,
      );
    });
  });
});
