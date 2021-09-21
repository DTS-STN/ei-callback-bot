"use strict";
// State machine to track a users progression through
// the callback bot dialog conversation flow
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackBotDetails = void 0;
class CallbackBotDetails {
    constructor() {
        this.toString = () => JSON.stringify(Object.assign({}, { phoneNumber: this.phoneNumber, date: this.date, time: this.time, authCode: this.authCode }), null, '  ');
        // Master error - flag that is thrown when we hit a critical error in the conversation flow
        this.masterError = null;
        // [STEP 1] Flag that confirms the user wants to set up a callback
        this.confirmCallbackStep = null;
        // [STEP 2] Flag that get the user primary phone number
        this.getUserPhoneNumberStep = null;
        // [STEP 3] Get user prefer date and time for the callback
        this.getPreferredCallbackDateAndTimeStep = null;
        // [STEP 4] send auth word to user
        this.confirmAuthWordStep = null;
        // [STEP 5] Display of the final call back date time
        this.confirmCallbackDetailsStep = null;
        this.date = '';
        this.phoneNumber = '';
        this.time = '';
        this.authCode = '';
        // State machine that stores the error counts of each step
        this.errorCount = {
            confirmCallbackStep: 0,
            getUserPhoneNumberStep: 0,
            getPreferredCallbackDateAndTimeStep: 0,
            confirmCallbackDetailsStep: 0,
            confirmAuthWordStep: 0
        };
        // TODO: Refactor and add an object that tracks status perhaps something like below
        /*
        this.currentStep = '';
        this.steps = [
            'confirmLookIntoStep',
            'confirmSendEmailStep',
            'getAndSendEmailStep',
            'confirmNotifyROEReceivedStep',
        ]
        */
    }
}
exports.CallbackBotDetails = CallbackBotDetails;
//# sourceMappingURL=callbackBotDetails.js.map