import sinon from 'sinon';
export default class MockFirebase {
  constructor() {
    this.initializeApp = sinon.stub();
    this.database = sinon.stub();
    this.database.returns({ref: function() {
      return {
        child: function() {
          return {
            push: function() {

            }
          }
        }
      }
    }});
  }
}
