import { DialogTestClient, DialogTestLogger } from 'botbuilder-testing';

import { CallbackRecognizer } from '../../dialogs/calllbackDialogs/callbackRecognizer';
import { GetPreferredMethodOfContactStep } from '../../dialogs/getPreferredMethodOfContactStep';
const assert = require('assert');
import * as tsSinon from 'ts-sinon';
import { Activity } from 'botbuilder';
import { ConfirmEmailStep } from '../../dialogs/confirmEmailStep';

describe('GetPreferredMethodOfContactStep', () => {
  const testCases = require('../testData/getPreferredMethodOfContactTestData');
  const sut = new GetPreferredMethodOfContactStep();
  afterEach(function () {
    tsSinon.default.restore();
  });
  testCases.map((testData) => {
    it(testData.name, async () => {
      const client = new DialogTestClient('test', sut, testData.initialData, [
        new DialogTestLogger(console),
      ]);

      const stub = tsSinon.default
        .stub()
        .callsFake(() => new ConfirmEmailStep());
      Object.setPrototypeOf(ConfirmEmailStep, stub);

      tsSinon.default
        .stub(CallbackRecognizer.prototype, 'executeLuisQuery')
        .callsFake(() =>
          JSON.parse(
            `{"intents": {"${testData.intent}": {"score": 1}}, "entities": {"$instance": {}}}`,
          ),
        );

      // Execute the test case
      console.log(`Test Case: ${testData.name}`);
      console.log(`Dialog Input ${JSON.stringify(testData.initialData)}`);
      for (const step of testData.steps) {
        let updatedActivity: Partial<Activity> = {
          text: step[0],
          locale: 'en',
        };

        // console.log('test 000000,', client.dialogTurnResult);
        const reply = await client.sendActivity(updatedActivity);
        // console.log('test -1-1-1-1-1,', client);
        // console.log('debug 1111', reply);
        assert.strictEqual(
          reply ? reply.text : null,
          step[1],
          `${reply ? reply.text : null} != ${step[1]}`,
        );
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
