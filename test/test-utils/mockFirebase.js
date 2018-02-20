import sinon from 'sinon';
export default class MockFirebase {
  constructor() {
    this.initializeApp = sinon.stub();
  }
}
