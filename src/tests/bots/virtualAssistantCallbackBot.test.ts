/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
 import { ActivityTypes, ConversationState, MemoryStorage, TestAdapter, TurnContext, UserState } from 'botbuilder';
 import { Dialog, DialogSet, DialogTurnStatus } from 'botbuilder-dialogs';
 import { VirtualAssistantCallbackBot  } from '../../bots/virtualAssistantCallbackBot';
 const assert = require('assert');

 /**
  * A simple mock for a root dialog that gets invoked by the bot.
  */
 class MockRootDialog extends Dialog {
     constructor() {
         super('mockRootDialog');
     }

     public async beginDialog(dc, options) {
         await dc.context.sendActivity(`${ this.id } mock invoked`);
         return await dc.endDialog();
     }

     public async run(turnContext, accessor) {
         const dialogSet = new DialogSet(accessor);
         dialogSet.add(this);

         const dialogContext = await dialogSet.createContext(turnContext);
         const results = await dialogContext.continueDialog();
         if (results.status === DialogTurnStatus.empty) {
             await dialogContext.beginDialog(this.id);
         }
     }
 }

 describe('CallbackBot', () => {
     const testAdapter = new TestAdapter(async (context) => undefined);

     async function processActivity(activity, bot) {
         const context = new TurnContext(testAdapter, activity);
         await bot.run(context);
     }

     it('Shows welcome card on member added and starts main dialog', async () => {
         const mockRootDialog = new MockRootDialog();
         const memoryStorage = new MemoryStorage();
         const conversationState = new ConversationState(memoryStorage)

         const dialogs = new DialogSet(conversationState.createProperty('DialogState'))
         dialogs.add(mockRootDialog)
         const sut = new VirtualAssistantCallbackBot(new ConversationState(memoryStorage), new UserState(memoryStorage), dialogs);

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
             type: ActivityTypes.ConversationUpdate
         };

         // Send the conversation update activity to the bot.
         await processActivity(conversationUpdateActivity, sut);

         // Assert we got the welcome card
         let reply = testAdapter.activityBuffer.shift();
         assert.strictEqual(reply.text, 'Hi Mary, I’m your virtual concierge!');
         reply =  testAdapter.activityBuffer.shift();
         assert.strictEqual(reply.text, ' Do you want to our agent contact you later? (1) Yes please! or (2) No thanks');

         // Assert that we started the main dialog.
         reply = testAdapter.activityBuffer.shift();
         assert.strictEqual(reply.text, 'mockRootDialog mock invoked');
     });
 });