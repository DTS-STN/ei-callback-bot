import {
    TextPrompt,
    ComponentDialog,
    WaterfallDialog,
    ChoiceFactory,
  } from"botbuilder-dialogs";

  import { LuisRecognizer } from "botbuilder-ai";

  import i18n  from "./locales/i18nConfig";

  const TEXT_PROMPT = "TEXT_PROMPT";
  export const CONFIRM_EMAIL_STEP = "CONFIRM_EMAIL_STEP";
  const CONFIRM_EMAIL_WATERFALL_STEP =
    "CONFIRM_EMAIL_WATERFALL_STEP";

  const MAX_ERROR_COUNT = 3;

  export class ConfirmEmailStep extends ComponentDialog {
    constructor() {
      super(CONFIRM_EMAIL_STEP);

      // Add a text prompt to the dialog stack
      this.addDialog(new TextPrompt(TEXT_PROMPT));

      this.addDialog(
        new WaterfallDialog(CONFIRM_EMAIL_WATERFALL_STEP, [
          this.initialStep.bind(this),
          this.finalStep.bind(this),
        ])
      );

      this.initialDialogId = CONFIRM_EMAIL_WATERFALL_STEP;
    }

    /**
     * Kick off the dialog by asking for an email address
     *
     */
    async initialStep(stepContext) {
      // Get the user details / state machine
      const callbackBotDetails = stepContext.options;

      // DEBUG
      // console.log('DEBUG UNBLOCKBOTDETAILS in confirmNotifyROEReceivedStep:', unblockBotDetails);

      // Set the text for the prompt
      const standardMsg = i18n.__("confirmEmailStepStandMsg");

      // Set the text for the retry prompt
      const retryMsg = i18n.__("confirmNotifyROEReceivedStepRetryMsg");

      // Check if the error count is greater than the max threshold
      if (
        callbackBotDetails.errorCount.confirmConfirmationStep >=
        MAX_ERROR_COUNT
      ) {
        // Throw the master error flag
        callbackBotDetails.masterError = true;

        // Set master error message to send
        const errorMsg = i18n.__("masterErrorMsg");

        // Send master error message
        await stepContext.context.sendActivity(errorMsg);

        // End the dialog and pass the updated details state machine
        return await stepContext.endDialog(callbackBotDetails);
      }

      // Check the user state to see if unblockBotDetails.getAndSendEmailStep is set to null or -1
      // If it is in the error state (-1) or or is set to null prompt the user
      // If it is false the user does not want to proceed
      if (
        callbackBotDetails.confirmConfirmationStep === null ||
        callbackBotDetails.confirmConfirmationStep === -1
      ) {


        // Setup the prompt message
        var promptMsg = "";
        // The current step is an error state
        if (callbackBotDetails.confirmEmailStep === -1) {
          promptMsg = retryMsg;
        } else {
          promptMsg = standardMsg;
        }

        const promptOptions = i18n.__(
          "confirmEmailStepStandardPromptOptions"
        );

        const promptDetails = {
          prompt: ChoiceFactory.forChannel(
            stepContext.context,
            promptOptions,
            promptMsg
          ),
        };

        return await stepContext.prompt(TEXT_PROMPT, promptDetails);
      } else {
        return await stepContext.next(false);
      }
    }

    /**
     *
     *
     */
    async finalStep(stepContext) {
      // Get the user details / state machine
      const callbackBotDetails = stepContext.options;

      // Language check
      var applicationId = "";
      var endpointKey = "";
      var endpoint = "";

      // Then change LUIZ appID
      if (
        stepContext.context.activity.locale.toLowerCase() === "fr-ca" ||
        stepContext.context.activity.locale.toLowerCase() === "fr-fr"
      ) {
        applicationId = process.env.LuisCallbackAppIdFR;
        endpointKey = process.env.LuisCallbackAPIKeyFR;
        endpoint = `https://${process.env.LuisCallbackAPIHostNameFR}.api.cognitive.microsoft.com`;
      } else {
        applicationId = process.env.LuisCallbackAppIdEN;
        endpointKey = process.env.LuisCallbackAPIKeyEN;
        endpoint = `https://${process.env.LuisCallbackAPIHostNameEN}.api.cognitive.microsoft.com`;
      }

      // LUIZ Recogniser processing
      const recognizer = new LuisRecognizer(
        {
          applicationId: applicationId,
          endpointKey: endpointKey,
          endpoint: endpoint,
        },
        {
          includeAllIntents: true,
          includeInstanceData: true,
        },
        true
      );

      // Call prompts recognizer
      const recognizerResult = await recognizer.recognize(stepContext.context);

      // Top intent tell us which cognitive service to use.
      const intent = LuisRecognizer.topIntent(recognizerResult, "None", 0.5);

      const closeMsg = i18n.__("confirmNotifyROEReceivedStepCloseMsg");

      switch (intent) {
        // Proceed
        // Not - adding these extra intent checks because of a bug with the french happy path
        case "promptConfirmSendEmailYes":
        case "promptConfirmNotifyYes":
        case "promptConfirmYes":
          console.log("INTENT: ", intent);
          callbackBotDetails.confirmEmailStep = true;
          return await stepContext.endDialog(callbackBotDetails);

        // Don't Proceed
        case "promptConfirmEmailNo":
        case "promptConfirmNo":
          console.log("INTENT: ", intent);
          callbackBotDetails.confirmEmailStep = false;

          await stepContext.context.sendActivity(closeMsg);

          return await stepContext.endDialog(callbackBotDetails);
        // Could not understand / None intent
        default: {
          // Catch all
          console.log("NONE INTENT");
          callbackBotDetails.confirmEmailStep = -1;
          callbackBotDetails.errorCount.confirmEmailStep++;

          return await stepContext.replaceDialog(
            CONFIRM_EMAIL_STEP,
            callbackBotDetails
          );
        }
      }
    }
  }


