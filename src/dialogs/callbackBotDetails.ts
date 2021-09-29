// State machine to track a users progression through
// the callback bot dialog conversation flow

export class CallbackBotDetails {
        public masterError;
        public confirmCallbackStep;
        public confirmCallbackDetailsStep;
        public getUserPhoneNumberStep;
        public confirmAuthWordStep;
        public getUserEmailStep;
        public errorCount;
        public getPreferredCallbackDateAndTimeStep;
        public phoneNumber;
        public date;
        public time;
        public authCode;

    constructor() {
        // Master error - flag that is thrown when we hit a critical error in the conversation flow
        this.masterError = null;

        // [STEP 1] Flag that confirms the user wants to set up a callback
        this.confirmCallbackStep = null;


        // [STEP 3] Get user prefer date and time for the callback
        this.getPreferredCallbackDateAndTimeStep = null;
       // [STEP 4] send auth word to user

        // [STEP 2] Flag that get the user primary phone number
        this.getUserPhoneNumberStep = null;

        this.getUserEmailStep = null;
        this.confirmAuthWordStep = null;


        // [STEP 5] Display of the final call back date time
        this.confirmCallbackDetailsStep = null;
        this.date = '';
        this.phoneNumber='';
        this.time = '';
        this.authCode = '';

        // State machine that stores the error counts of each step
        this.errorCount = {
            confirmCallbackStep: 0,
            getUserPhoneNumberStep: 0,
            getPreferredCallbackDateAndTimeStep: 0,
            confirmCallbackDetailsStep: 0,
            confirmAuthWordStep:0,
            getUserEmailStep:0
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
  public  toString = () => JSON.stringify(Object.assign({}, {phoneNumber: this.phoneNumber, date: this.date, time:this.time, authCode: this.authCode}), null, '  ');
}


