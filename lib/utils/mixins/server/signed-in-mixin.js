SignedInMixin = function (methodOptions) {
  const runFunc = methodOptions.run

  methodOptions.run = function (_data) {

    // console.log(this);
    // console.log(_data);

    const userId = this.userId

    if (!userId) {
      throw new Meteor.Error('unauthorized', 'Must be logged in')
    }

    return runFunc.call(this, ...arguments)
  }

  return methodOptions
}
