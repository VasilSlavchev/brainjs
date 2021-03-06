var _              = require('lodash')
  , AspectAnalysis = require('./aspect');

var RegularizationAnalysis = function (analysis, options) {
  AspectAnalysis.call(this, analysis, {
    step  : 0.02,
    start : 0,
    stop  : 1
  });

  this.setOptions(options);
};

RegularizationAnalysis.prototype = new AspectAnalysis();

RegularizationAnalysis.prototype.getValues = function () {
  return _.range(
    this.options.start,
    this.options.stop + this.options.step,
    this.options.step
  );
};

RegularizationAnalysis.prototype.run = function () {
  var analyses
    , values
    , value
    , i
    , l;

  analyses = [];
  values   = this.getValues();

  for (i = 0, l = values.length; i < l; i++) {
    value = values[i];

    this.analysis.training.derivative.setOptions({ regularization: value });

    analyses.push([value, this.analysis.run()]);

    this.report('analysis', {
      iterations : i + 1,
      value      : value
    });
  }

  return analyses;
};

exports = module.exports = RegularizationAnalysis;
