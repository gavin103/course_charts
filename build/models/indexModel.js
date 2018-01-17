'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var indexModel = function () {
    function indexModel(ctx) {
        (0, _classCallCheck3.default)(this, indexModel);

        this.ctx = ctx;
    }

    (0, _createClass3.default)(indexModel, [{
        key: 'getList',
        value: function getList() {
            var option = {
                uri: 'http://localhost/getcourses.php',
                method: 'GET'
            };
            return new _promise2.default(function (resolve, reject) {
                (0, _requestPromise2.default)(option).then(function (res) {
                    resolve(res);
                });
            });
        }
    }]);
    return indexModel;
}();

exports.default = indexModel;