module.exports = [
  {
    expectedResult: {
      masterError: null,
      confirmCallbackStep: true,
      confirmCallbackPhoneNumberStep: true,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        confirmCallbackStep: 0,
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackPhoneNumberStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0,
      },
    },
    expectedStatus: 'complete',
    intent: 'promptConfirmYes',
    initialData: {
      masterError: null,
      confirmCallbackStep: true,
      confirmCallbackPhoneNumberStep: null,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        confirmCallbackStep: 0,
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackPhoneNumberStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0,
      },
    },
    name: 'confirm Yes',
    steps: [
      [
        `Ok, is XXX-XXX-XXXX still the best number to reach you? (1) Yes, correct or (2) No, it's not`,
        `Ok, is XXX-XXX-XXXX still the best number to reach you? (1) Yes, correct or (2) No, it's not`,
      ],
      [
        'Yes, correct',
        'Great - I can have someone call you within the next 48 hours,between 9-5 EST.',
      ],
    ],
  },
  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    intent: 'promptConfirmNo',
    initialData: {
      masterError: null,
      confirmCallbackStep: true,
      confirmCallbackPhoneNumberStep: null,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        confirmCallbackStep: 0,
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackPhoneNumberStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0,
      },
    },
    name: 'Choose No',
    steps: [
      [
        `Ok, is XXX-XXX-XXXX still the best number to reach you? (1) Yes, correct or (2) No, it's not`,
        `Ok, is XXX-XXX-XXXX still the best number to reach you? (1) Yes, correct or (2) No, it's not`,
      ],
      ['Yes, correct', `No problem - what's your new phone number?`],
    ],
  },

  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    intent: 'None',
    initialData: {
      masterError: null,
      confirmCallbackStep: true,
      confirmCallbackPhoneNumberStep: null,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        confirmCallbackStep: 0,
        getUserPhoneNumberStep: 0,
        confirmCallbackPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0,
      },
    },
    name: 'Error input once',
    steps: [
      [
        `Ok, is XXX-XXX-XXXX still the best number to reach you? (1) Yes, correct or (2) No, it's not`,
        `Ok, is XXX-XXX-XXXX still the best number to reach you? (1) Yes, correct or (2) No, it's not`,
      ],
      [
        'haha',
        `Oops - I'm not sure what you meant. Is XXX-XXX-XXXX still the best number to reach you? (1) Yes, correct or (2) No, it's not`,
      ],
    ],
  },
  {
    expectedResult: {
      masterError: true,
      confirmCallbackStep: true,
      confirmCallbackPhoneNumberStep: -1,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        confirmCallbackStep: 0,
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackPhoneNumberStep: 3,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0,
      },
    },
    intent: 'NONE',
    expectedStatus: 'complete',
    initialData: {
      masterError: null,
      confirmCallbackStep: true,
      confirmCallbackPhoneNumberStep: null,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        confirmCallbackStep: 0,
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackPhoneNumberStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0,
      },
    },
    name: 'Error input more than 3 times',
    steps: [
      [
        `Ok, is XXX-XXX-XXXX still the best number to reach you? (1) Yes, correct or (2) No, it's not`,
        `Ok, is XXX-XXX-XXXX still the best number to reach you? (1) Yes, correct or (2) No, it's not`,
      ],
      [
        'haha',
        `Oops - I'm not sure what you meant. Is XXX-XXX-XXXX still the best number to reach you? (1) Yes, correct or (2) No, it's not`,
      ],
      [
        'haha',
        `Oops - I'm not sure what you meant. Is XXX-XXX-XXXX still the best number to reach you? (1) Yes, correct or (2) No, it's not`,
      ],
      [
        'haha',
        `Hmm, I'm having a hard time understanding you. Sorry about that! Try visiting our Help Center or give us a call at (XXX-XXX-XXXX).`,
      ],
    ],
  },
];
