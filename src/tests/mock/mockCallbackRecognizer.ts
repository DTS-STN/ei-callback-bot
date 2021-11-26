import { CallbackRecognizer } from '../../dialogs/calllbackDialogs/callbackRecognizer';

/**
 * A mock CallbackBotRecognizer for our main dialog tests that takes
 * a mock luis result and can set as isConfigured === false.
 */
class MockCallbackRecognizer extends CallbackRecognizer {
  private isLuisConfigured: boolean;
  constructor(private lang: string, private mockResult?: any) {
    super(lang);
    this.isLuisConfigured = true;
    this.mockResult = mockResult;
  }

  public async executeLuisQuery(context) {
    return this.mockResult;
  }

  get isConfigured() {
    return this.isLuisConfigured;
  }
}
