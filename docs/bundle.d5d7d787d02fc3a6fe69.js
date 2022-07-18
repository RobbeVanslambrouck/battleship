/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pubsub-js */ "./node_modules/pubsub-js/src/pubsub.js");
/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pubsub_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _domElements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domElements */ "./src/domElements.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ "./src/game.js");




var App = function () {
  var showHomeScreen = function showHomeScreen() {
    var PLAY_GAME_TOPIC = 'btnPlayGame';
    var gameModes = _game__WEBPACK_IMPORTED_MODULE_2__["default"].getGameModes().map(function (mode) {
      return mode.toLocaleLowerCase().replaceAll('_', ' ');
    });
    _domElements__WEBPACK_IMPORTED_MODULE_1__["default"].renderHomePage(PLAY_GAME_TOPIC, gameModes);
    var playGameToken = '';
    console.log(PLAY_GAME_TOPIC);
    playGameToken = pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(PLAY_GAME_TOPIC, function (msg, data) {
      var gameMode = data.gameMode.replaceAll(' ', '_').toUpperCase();
      pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().unsubscribe(playGameToken);
      _game__WEBPACK_IMPORTED_MODULE_2__["default"].setGameMode(gameMode);
      _game__WEBPACK_IMPORTED_MODULE_2__["default"].startGame();
    });
  };

  var start = function start() {
    showHomeScreen();
  };

  return {
    showHomeScreen: showHomeScreen,
    start: start
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/domElements.js":
/*!****************************!*\
  !*** ./src/domElements.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pubsub-js */ "./node_modules/pubsub-js/src/pubsub.js");
/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pubsub_js__WEBPACK_IMPORTED_MODULE_0__);


var DomElements = function () {
  var game = document.querySelector('.game');

  var createBoard = function createBoard(board) {
    var showShips = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var subTopic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var boardElement = document.createElement('div');
    boardElement.className = 'board';

    var _loop = function _loop(i) {
      var row = document.createElement('div');
      row.className = 'row';
      row.id = "row ".concat(i);

      var _loop2 = function _loop2(j) {
        var Tile = document.createElement('div');
        Tile.classList.add('tile');
        Tile.id = "".concat(j, " ").concat(i);

        if (subTopic) {
          Tile.onclick = function () {
            pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(subTopic, {
              x: j,
              y: i
            });
          };
        }

        switch (board[i][j]) {
          case 'w':
            Tile.classList.add('water');
            break;

          case 'm':
            Tile.classList.add('pin');
            Tile.classList.add('miss');
            break;

          case 'h':
            Tile.classList.add('pin');
            Tile.classList.add('hit');
            break;

          case 's':
            Tile.classList.add('pin');
            Tile.classList.add('hit');
            Tile.classList.add('sunk');
            break;

          default:
            if (showShips) {
              Tile.classList.add('ship');
              break;
            }

            Tile.classList.add('water');
            break;
        }

        row.append(Tile);
      };

      for (var j = 0; j < board[i].length; j += 1) {
        _loop2(j);
      }

      boardElement.append(row);
    };

    for (var i = 0; i < board.length; i += 1) {
      _loop(i);
    }

    return boardElement;
  };

  var renderBoard = function renderBoard(board, playerType, id) {
    var clickPub = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    game.querySelector('.game');
    var divBoard = document.createElement('div');
    divBoard.id = "board-".concat(id);
    divBoard.classList.add(playerType);
    var showShips = playerType === 'player';
    divBoard.append(createBoard(board, showShips, clickPub));
    game.append(divBoard);
  };

  var updateBoard = function updateBoard(id, board) {
    var clickPub = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    game.querySelector('.game');
    var divBoard = game.querySelector("#board-".concat(id));
    var showShips = divBoard.classList.contains('player');
    divBoard.innerHTML = '';
    divBoard.append(createBoard(board, showShips, clickPub));
  };

  var clearGame = function clearGame() {
    game.innerHTML = '';
  };

  var renderHomePage = function renderHomePage(playSubTopic) {
    var gameModes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var main = document.querySelector('main');
    var divHome = document.createElement('div');
    divHome.classList.add('home');
    var selectGameMode = document.createElement('select');
    selectGameMode.name = 'gameMode';
    selectGameMode.id = 'gameMode';
    gameModes.forEach(function (mode) {
      var gameMode = document.createElement('option');
      gameMode.value = mode;
      gameMode.textContent = mode;
      selectGameMode.append(gameMode);
    });
    divHome.append(selectGameMode);
    var btnPlay = document.createElement('button');
    btnPlay.type = 'button';
    btnPlay.textContent = 'play game';

    btnPlay.onclick = function (e) {
      e.stopPropagation();
      var gameMode = selectGameMode.value;
      pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(playSubTopic, {
        gameMode: gameMode
      });
      divHome.remove();
    };

    divHome.prepend(btnPlay);
    main.append(divHome);
  };

  var showGameOverModal = function showGameOverModal(replaySubTopic, HomeSubTopic, winner) {
    var divModal = document.createElement('div');
    divModal.classList.add('modal');
    divModal.id = 'gameOverModal';
    var divGameOverModal = document.createElement('div');
    divGameOverModal.classList.add('modal-content');
    divModal.append(divGameOverModal);
    var pGameOver = document.createElement('p');
    pGameOver.classList.add('modal-title');
    pGameOver.textContent = 'game over';
    divGameOverModal.append(pGameOver);
    var pWinner = document.createElement('p');
    pWinner.classList.add('modal-msg');
    pWinner.textContent = "".concat(winner, " won");
    divGameOverModal.append(pWinner);
    var btnPlayAgain = document.createElement('button');
    btnPlayAgain.classList.add('modal-action');
    btnPlayAgain.textContent = 'play again';
    btnPlayAgain.type = 'button';

    btnPlayAgain.onclick = function (e) {
      e.stopPropagation();
      divModal.remove();
      pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(replaySubTopic, {});
    };

    divGameOverModal.append(btnPlayAgain);
    var btnCancel = document.createElement('button');
    btnCancel.classList.add('modal-cancel');
    btnCancel.textContent = 'back to menu';
    btnCancel.type = 'button';

    btnCancel.onclick = function (e) {
      e.stopPropagation();
      divModal.remove();
      pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(HomeSubTopic, {});
    };

    divGameOverModal.append(btnCancel);
    document.querySelector('main').append(divModal);
  };

  return {
    renderBoard: renderBoard,
    updateBoard: updateBoard,
    clearGame: clearGame,
    renderHomePage: renderHomePage,
    showGameOverModal: showGameOverModal
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DomElements);

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pubsub-js */ "./node_modules/pubsub-js/src/pubsub.js");
/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pubsub_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _domElements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domElements */ "./src/domElements.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable no-await-in-loop */





var Game = function () {
  var gameModes = ['CPU_VS_PLAYER', 'CPU_FIGHT', 'PLAYER_VS_PLAYER'];
  var gameMode = gameModes[1];

  var getGameModes = function getGameModes() {
    return gameModes;
  };

  var setGameMode = function setGameMode(mode) {
    gameMode = mode;
  };

  var showHomeScreen = function showHomeScreen() {
    var PLAY_GAME_TOPIC = 'btnPlayGame';
    var modes = getGameModes().map(function (mode) {
      return mode.toLocaleLowerCase().replaceAll('_', ' ');
    });
    _domElements__WEBPACK_IMPORTED_MODULE_1__["default"].renderHomePage(PLAY_GAME_TOPIC, modes);
    var playGameToken = '';
    playGameToken = pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(PLAY_GAME_TOPIC, function (msg, data) {
      var mode = data.gameMode.replaceAll(' ', '_').toUpperCase();
      pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().unsubscribe(playGameToken);
      Game.setGameMode(mode);
      Game.startGame();
    });
  };

  var gameOverModal = function gameOverModal(winner) {
    var tokenReplay = '';
    var tokenHome = '';
    var REPLAY_TOPIC = 'replay';
    var BACK_HOME_TOPIC = 'backHome';
    tokenReplay = pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(REPLAY_TOPIC, function () {
      pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().unsubscribe(tokenReplay);
      pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().unsubscribe(tokenHome);
      _domElements__WEBPACK_IMPORTED_MODULE_1__["default"].clearGame();
      Game.startGame();
    });
    tokenHome = pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(BACK_HOME_TOPIC, function () {
      pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().unsubscribe(tokenReplay);
      pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().unsubscribe(tokenHome);
      _domElements__WEBPACK_IMPORTED_MODULE_1__["default"].clearGame();
      showHomeScreen();
    });
    _domElements__WEBPACK_IMPORTED_MODULE_1__["default"].showGameOverModal(REPLAY_TOPIC, BACK_HOME_TOPIC, winner);
  };

  var playerTurn = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(player, opponent, opponentBoardId, inputTopic) {
      var res, inputProm, inputSub, input, data;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              inputProm = function inputProm(resolve) {
                res = resolve;
              };

              inputSub = function inputSub(msg, data) {
                pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().unsubscribe(inputTopic);
                var turnMsg = player.turn(data.x, data.y, opponent);

                if (turnMsg === 'already attacked') {
                  pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(inputTopic, inputSub);
                  return;
                }

                res(data);
              };

              input = new Promise(inputProm);
              pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(inputTopic, inputSub);
              _context.next = 6;
              return input;

            case 6:
              data = _context.sent;
              _domElements__WEBPACK_IMPORTED_MODULE_1__["default"].updateBoard(opponentBoardId, opponent.getGameboard().getBoard(), inputTopic);
              return _context.abrupt("return", data);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function playerTurn(_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();

  var placeShipsOnPlayersBoards = function placeShipsOnPlayersBoards(players) {
    players.forEach(function (player) {
      var ships = [(0,_ship__WEBPACK_IMPORTED_MODULE_3__["default"])(5), (0,_ship__WEBPACK_IMPORTED_MODULE_3__["default"])(4), (0,_ship__WEBPACK_IMPORTED_MODULE_3__["default"])(3), (0,_ship__WEBPACK_IMPORTED_MODULE_3__["default"])(3), (0,_ship__WEBPACK_IMPORTED_MODULE_3__["default"])(2)];

      for (var i = 0; i < ships.length; i += 1) {
        player.getGameboard().placeShipRandomly(ships[i]);
      }
    });
  };

  var cpuVsCpu = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var gameOver, winner, players;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              gameOver = false;
              players = [];
              players[0] = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])('cpu 1');
              players[1] = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])('cpu 2');
              placeShipsOnPlayersBoards(players);
              _domElements__WEBPACK_IMPORTED_MODULE_1__["default"].renderBoard(players[0].getGameboard().getBoard(), 'player', 0);
              _domElements__WEBPACK_IMPORTED_MODULE_1__["default"].renderBoard(players[1].getGameboard().getBoard(), 'player', 1);

            case 7:
              if (gameOver) {
                _context2.next = 22;
                break;
              }

              _context2.next = 10;
              return players[0].AISmartTurn(players[1]);

            case 10:
              _domElements__WEBPACK_IMPORTED_MODULE_1__["default"].updateBoard(1, players[1].getGameboard().getBoard());
              gameOver = players[1].getGameboard().areAllShipsSunk();

              if (!gameOver) {
                _context2.next = 15;
                break;
              }

              winner = players[0].getName();
              return _context2.abrupt("break", 22);

            case 15:
              _context2.next = 17;
              return players[1].AISmartTurn(players[0]);

            case 17:
              _domElements__WEBPACK_IMPORTED_MODULE_1__["default"].updateBoard(0, players[0].getGameboard().getBoard());
              gameOver = players[0].getGameboard().areAllShipsSunk();

              if (gameOver) {
                winner = players[1].getName();
              }

              _context2.next = 7;
              break;

            case 22:
              gameOverModal(winner);

            case 23:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function cpuVsCpu() {
      return _ref2.apply(this, arguments);
    };
  }();

  var cpuVsPlayer = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var players, INPUT_TOPIC, gameOver, winner;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              players = [];
              INPUT_TOPIC = 'attack';
              gameOver = false;
              winner = '';
              players[0] = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])('player');
              players[1] = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])('cpu');
              placeShipsOnPlayersBoards(players);
              _domElements__WEBPACK_IMPORTED_MODULE_1__["default"].renderBoard(players[1].getGameboard().getBoard(), 'enemy', 1, INPUT_TOPIC);
              _domElements__WEBPACK_IMPORTED_MODULE_1__["default"].renderBoard(players[0].getGameboard().getBoard(), 'player', 0);

            case 9:
              if (gameOver) {
                _context3.next = 25;
                break;
              }

              _context3.next = 12;
              return playerTurn(players[0], players[1], 1, INPUT_TOPIC);

            case 12:
              gameOver = players[1].getGameboard().areAllShipsSunk();

              if (!gameOver) {
                _context3.next = 16;
                break;
              }

              winner = players[0].getName();
              return _context3.abrupt("break", 25);

            case 16:
              _context3.next = 18;
              return players[1].AISmartTurn(players[0], 300);

            case 18:
              _domElements__WEBPACK_IMPORTED_MODULE_1__["default"].updateBoard(0, players[0].getGameboard().getBoard());
              gameOver = players[0].getGameboard().areAllShipsSunk();

              if (!gameOver) {
                _context3.next = 23;
                break;
              }

              winner = players[1].getName();
              return _context3.abrupt("break", 25);

            case 23:
              _context3.next = 9;
              break;

            case 25:
              gameOverModal(winner);

            case 26:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function cpuVsPlayer() {
      return _ref3.apply(this, arguments);
    };
  }();

  var PlayerVsPlayer = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var players, gameOver, winner, P1_INPUT_TOPIC, P2_INPUT_TOPIC;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              players = [];
              gameOver = false;
              winner = '';
              P1_INPUT_TOPIC = 'p1Input';
              P2_INPUT_TOPIC = 'p2Input';
              players[0] = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])('player 1');
              players[1] = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])('player 2');
              placeShipsOnPlayersBoards(players);
              _domElements__WEBPACK_IMPORTED_MODULE_1__["default"].renderBoard(players[0].getGameboard().getBoard(), 'enemy', 0, P2_INPUT_TOPIC);
              _domElements__WEBPACK_IMPORTED_MODULE_1__["default"].renderBoard(players[1].getGameboard().getBoard(), 'enemy', 1, P1_INPUT_TOPIC);

            case 10:
              if (gameOver) {
                _context4.next = 25;
                break;
              }

              _context4.next = 13;
              return playerTurn(players[0], players[1], 1, P1_INPUT_TOPIC);

            case 13:
              gameOver = players[1].getGameboard().areAllShipsSunk();

              if (!gameOver) {
                _context4.next = 17;
                break;
              }

              winner = players[0].getName();
              return _context4.abrupt("break", 25);

            case 17:
              _context4.next = 19;
              return playerTurn(players[1], players[0], 0, P2_INPUT_TOPIC);

            case 19:
              gameOver = players[0].getGameboard().areAllShipsSunk();

              if (!gameOver) {
                _context4.next = 23;
                break;
              }

              winner = players[1].getName();
              return _context4.abrupt("break", 25);

            case 23:
              _context4.next = 10;
              break;

            case 25:
              gameOverModal(winner);

            case 26:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function PlayerVsPlayer() {
      return _ref4.apply(this, arguments);
    };
  }();

  var startGame = function startGame() {
    if (gameMode === 'CPU_FIGHT') {
      cpuVsCpu();
      return;
    }

    if (gameMode === 'CPU_VS_PLAYER') {
      cpuVsPlayer();
      return;
    }

    if (gameMode === 'PLAYER_VS_PLAYER') {
      PlayerVsPlayer();
    }
  };

  return {
    startGame: startGame,
    getGameModes: getGameModes,
    setGameMode: setGameMode
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./src/helper.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }


/*
  the gameboard is an array were the tiles are: 
  - 'w' (water)
  - 'h' (hit)
  - 'm' (miss)
  - 's' (sunk)
  - { ship, x, y, dir} (a ship object with the coordinates of the fist schip section and its direction either 'h' or 'v')
*/

var Gameboard = function Gameboard() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  var board = [];

  for (var i = 0; i < size; i += 1) {
    board[i] = new Array(size).fill('w');
  }

  var ships = [];

  var getBoard = function getBoard() {
    return board;
  };

  var placeSunkShipOnGameboard = function placeSunkShipOnGameboard(_ref) {
    var ship = _ref.ship,
        x = _ref.x,
        y = _ref.y,
        dir = _ref.dir;
    var posX = x;
    var posY = y;

    for (var _i = 0; _i < ship.getLength(); _i += 1) {
      board[posY][posX] = 's';

      if (dir.match(/^(horizontal|h)$/i)) {
        posX += 1;
      }

      if (dir.match(/^(vertical|v)$/i)) {
        posY += 1;
      }
    }
  };

  var receiveAttack = function receiveAttack(x, y) {
    if (board[y][x] === 'w') {
      board[y][x] = 'm';
      return 'miss';
    }

    if (board[y][x] === 'm' || board[y][x] === 'h' || board[y][x] === 's') {
      return 'already attacked';
    }

    var shipInfo = board[y][x];
    var place = 0;

    if (shipInfo.dir.match(/^(horizontal|h)$/i)) {
      place = x - shipInfo.x;
    }

    if (shipInfo.dir.match(/^(vertical|v)$/i)) {
      place = y - shipInfo.y;
    }

    shipInfo.ship.hitAt(place);

    if (shipInfo.ship.isSunk()) {
      placeSunkShipOnGameboard(shipInfo);
      board[y][x] = 's';
      return 'hit and sunk';
    }

    board[y][x] = 'h';
    return 'hit';
  };

  var canPlaceShip = function canPlaceShip(ship, x, y, dir) {
    var allowShipBordering = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

    if (x >= size || y >= size) {
      return false;
    }

    if (!allowShipBordering) {
      if (dir.match(/^(horizontal|h)$/i)) {
        if (x - 1 >= 0 && _typeof(board[y][x - 1]) === 'object') return false;
        if (x + ship.getLength() < size && _typeof(board[y][x + ship.getLength()]) === 'object') return false;
      }

      if (dir.match(/^(vertical|v)$/i)) {
        if (y - 1 >= 0 && _typeof(board[y - 1][x]) === 'object') return false;
        if (y + ship.getLength() < size && _typeof(board[y + ship.getLength()][x]) === 'object') return false;
      }
    }

    var posX = x;
    var posY = y;

    for (var _i2 = 0; _i2 < ship.getLength(); _i2 += 1) {
      if (posY >= size || posX >= size || board[posY][posX] !== 'w') {
        return false;
      }

      if (dir.match(/^(horizontal|h)$/i)) {
        if (!allowShipBordering && posY + 1 < size && _typeof(board[posY + 1][posX]) === 'object') return false;
        if (!allowShipBordering && posY - 1 >= 0 && _typeof(board[posY - 1][posX]) === 'object') return false;
        posX += 1;
      }

      if (dir.match(/^(vertical|v)$/i)) {
        if (!allowShipBordering && posX + 1 < size && _typeof(board[posY][posX + 1]) === 'object') return false;
        if (!allowShipBordering && posX - 1 >= 0 && _typeof(board[posY][posX - 1]) === 'object') return false;
        posY += 1;
      }
    }

    return true;
  };

  var placeShipOnGameboard = function placeShipOnGameboard(ship, x, y, dir) {
    var posX = x;
    var posY = y;
    ships.push({
      ship: ship,
      x: x,
      y: y,
      dir: dir
    });

    for (var _i3 = 0; _i3 < ship.getLength(); _i3 += 1) {
      board[posY][posX] = ships[ships.length - 1];

      if (dir.match(/^(horizontal|h)$/i)) {
        posX += 1;
      }

      if (dir.match(/^(vertical|v)$/i)) {
        posY += 1;
      }
    }
  };

  var placeShip = function placeShip(ship, x, y) {
    var dir = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'h';
    var allowShipBordering = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

    if (canPlaceShip(ship, x, y, dir, allowShipBordering)) {
      placeShipOnGameboard(ship, x, y, dir);
      return true;
    }

    return false;
  };

  var getTiles = function getTiles(type) {
    var tiles = [];

    for (var y = 0; y < board.length; y += 1) {
      for (var x = 0; x < board.length; x += 1) {
        if (board[y][x] === type) {
          tiles.push({
            x: x,
            y: y
          });
        }
      }
    }

    return tiles;
  };

  var placeShipRandomly = function placeShipRandomly(ship) {
    var availableTiles = (0,_helper__WEBPACK_IMPORTED_MODULE_0__["default"])(getTiles('w'));
    var directions = (0,_helper__WEBPACK_IMPORTED_MODULE_0__["default"])(['h', 'v']);
    var dir;
    var pos;

    while (availableTiles.length > 0) {
      pos = availableTiles.pop(); // eslint-disable-next-line prefer-destructuring

      dir = directions[1];

      if (!canPlaceShip(ship, pos.x, pos.y, dir, false)) {
        // eslint-disable-next-line prefer-destructuring
        dir = directions[0];
      }

      if (canPlaceShip(ship, pos.x, pos.y, dir, false)) {
        placeShipOnGameboard(ship, pos.x, pos.y, dir);
        return true;
      }
    }

    return false;
  };

  var areAllShipsSunk = function areAllShipsSunk() {
    for (var _i4 = 0; _i4 < ships.length; _i4 += 1) {
      if (!ships[_i4].ship.isSunk()) {
        return false;
      }
    }

    return true;
  };

  return {
    getBoard: getBoard,
    receiveAttack: receiveAttack,
    placeShip: placeShip,
    placeShipRandomly: placeShipRandomly,
    areAllShipsSunk: areAllShipsSunk
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ shuffle),
/* harmony export */   "delay": () => (/* binding */ delay),
/* harmony export */   "randInt": () => (/* binding */ randInt)
/* harmony export */ });
function shuffle(array) {
  var shuffledArray = array;

  for (var i = array.length - 1; i > 0; i -= 1) {
    // Pick a remaining element.
    var randomIndex = Math.floor(Math.random() * (i + 1)); // And swap it with the current element.

    var _ref = [array[randomIndex], array[i]];
    shuffledArray[i] = _ref[0];
    shuffledArray[randomIndex] = _ref[1];
  }

  return shuffledArray;
}
function randInt(min, max) {
  if (min > max) {
    return NaN;
  }

  var randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomInt;
}
function delay(milliseconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, milliseconds);
  });
}

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/helper.js");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var Player = function Player(name) {
  var thisName = name;
  var gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])(10);

  var getName = function getName() {
    return thisName;
  };

  var SetName = function SetName(newName) {
    thisName = newName;
  };

  var getGameboard = function getGameboard() {
    return gameboard;
  };

  var setGameboard = function setGameboard(NewBoard) {
    gameboard = NewBoard;
  };

  var turn = function turn(x, y, enemy) {
    return enemy.getGameboard().receiveAttack(x, y);
  };

  var AIRandomTurn = function AIRandomTurn(enemy) {
    var attackTable = [];
    var enemyBoard = enemy.getGameboard().getBoard();

    for (var _i = 0; _i < enemyBoard.length; _i += 1) {
      for (var j = 0; j < enemyBoard[_i].length; j += 1) {
        if (enemyBoard[_i][j] !== 'h' && enemyBoard[_i][j] !== 'm') {
          attackTable.push({
            x: j,
            y: _i
          });
        }
      }
    }

    var i = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.randInt)(0, attackTable.length - 1);
    enemy.getGameboard().receiveAttack(attackTable[i].x, attackTable[i].y);
  };

  var getTileValue = function getTileValue(x, y, board) {
    var HIT = 4;
    var value = 0;
    var extBrd = [];
    extBrd.push(new Array(board.length + 2).fill('w'));
    board.forEach(function (row) {
      var extRow = ['w'].concat(_toConsumableArray(row), ['w']);
      extBrd.push(extRow);
    });
    extBrd.push(new Array(board.length + 2).fill('w'));
    var extX = x + 1;
    var extY = y + 1;
    if (extBrd[extY + 1][extX] === 'h' && extBrd[extY - 1][extX] === 'h') value += 4;
    if (extBrd[extY][extX + 1] === 'h' && extBrd[extY][extX - 1] === 'h') value += 4;
    if (extBrd[extY + 1][extX] === 'h' && (extBrd[extY + 1][extX - 1] === 'h' || extBrd[extY + 1][extX + 1] === 'h')) value -= HIT;
    if (extBrd[extY - 1][extX] === 'h' && (extBrd[extY - 1][extX - 1] === 'h' || extBrd[extY - 1][extX + 1] === 'h')) value -= HIT;
    if (extBrd[extY][extX + 1] === 'h' && (extBrd[extY - 1][extX + 1] === 'h' || extBrd[extY + 1][extX + 1] === 'h')) value -= HIT;
    if (extBrd[extY][extX - 1] === 'h' && (extBrd[extY - 1][extX - 1] === 'h' || extBrd[extY + 1][extX - 1] === 'h')) value -= HIT;
    if (extBrd[extY + 1][extX] === 'h') value += HIT;
    if (extBrd[extY - 1][extX] === 'h') value += HIT;
    if (extBrd[extY][extX + 1] === 'h') value += HIT;
    if (extBrd[extY][extX - 1] === 'h') value += HIT;
    if (extBrd[extY + 1][extX] === 'm') value -= 1;
    if (extBrd[extY + 1][extX] === 's') value -= 1;
    if (extBrd[extY - 1][extX] === 'm') value -= 1;
    if (extBrd[extY - 1][extX] === 's') value -= 1;
    if (extBrd[extY][extX + 1] === 'm') value -= 1;
    if (extBrd[extY][extX + 1] === 's') value -= 1;
    if (extBrd[extY][extX - 1] === 'm') value -= 1;
    if (extBrd[extY][extX - 1] === 's') value -= 1;
    return value;
  };

  var AISmartTurn = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(enemy) {
      var milliseconds,
          attackTable,
          maxTileValue,
          enemyBoard,
          _i2,
          j,
          tileValue,
          i,
          _args = arguments;

      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              milliseconds = _args.length > 1 && _args[1] !== undefined ? _args[1] : 100;
              attackTable = [];
              maxTileValue = -Infinity;
              enemyBoard = enemy.getGameboard().getBoard();

              for (_i2 = 0; _i2 < enemyBoard.length; _i2 += 1) {
                for (j = 0; j < enemyBoard[_i2].length; j += 1) {
                  if (enemyBoard[_i2][j] === 'w' || _typeof(enemyBoard[_i2][j]) === 'object') {
                    tileValue = getTileValue(j, _i2, enemyBoard);

                    if (tileValue === maxTileValue) {
                      attackTable.push({
                        x: j,
                        y: _i2,
                        tileValue: tileValue
                      });
                    }

                    if (tileValue > maxTileValue) {
                      maxTileValue = tileValue;
                      attackTable = [];
                      attackTable.push({
                        x: j,
                        y: _i2,
                        tileValue: tileValue
                      });
                    }
                  }
                }
              }

              i = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.randInt)(0, attackTable.length - 1);
              _context.next = 8;
              return (0,_helper__WEBPACK_IMPORTED_MODULE_1__.delay)(milliseconds);

            case 8:
              enemy.getGameboard().receiveAttack(attackTable[i].x, attackTable[i].y);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function AISmartTurn(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var AIImpossibleTurn = function AIImpossibleTurn(enemy) {
    var attackTable = [];
    var enemyBoard = enemy.getGameboard().getBoard();

    for (var _i3 = 0; _i3 < enemyBoard.length; _i3 += 1) {
      for (var j = 0; j < enemyBoard[_i3].length; j += 1) {
        if (_typeof(enemyBoard[_i3][j]) === 'object') {
          attackTable.push({
            x: j,
            y: _i3
          });
        }
      }
    }

    if (attackTable.length === 0) {
      AIRandomTurn(enemy);
      return;
    }

    var i = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.randInt)(0, attackTable.length - 1);
    enemy.getGameboard().receiveAttack(attackTable[i].x, attackTable[i].y);
  };

  var AIInstaKillTurn = function AIInstaKillTurn(enemy) {
    var attackTable = [];
    var enemyBoard = enemy.getGameboard().getBoard();

    for (var i = 0; i < enemyBoard.length; i += 1) {
      for (var j = 0; j < enemyBoard[i].length; j += 1) {
        if (_typeof(enemyBoard[i][j]) === 'object') {
          attackTable.push({
            x: j,
            y: i
          });
        }
      }
    }

    if (attackTable.length === 0) {
      AIRandomTurn(enemy);
      return;
    }

    attackTable.forEach(function (attack) {
      enemy.getGameboard().receiveAttack(attack.x, attack.y);
    });
  };

  return {
    getName: getName,
    SetName: SetName,
    getGameboard: getGameboard,
    setGameboard: setGameboard,
    turn: turn,
    AIRandomTurn: AIRandomTurn,
    AISmartTurn: AISmartTurn,
    AIImpossibleTurn: AIImpossibleTurn,
    AIInstaKillTurn: AIInstaKillTurn
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Ship = function Ship(length) {
  var hits = [];

  for (var i = 0; i < length; i += 1) {
    hits[i] = false;
  }

  var getLength = function getLength() {
    return length;
  };

  var getHits = function getHits() {
    return hits;
  };

  var isHitAt = function isHitAt(place) {
    return hits[place];
  };

  var hitAt = function hitAt(place) {
    if (hits[place]) {
      return false;
    }

    hits[place] = true;
    return true;
  };

  var isSunk = function isSunk() {
    for (var _i = 0; _i < length; _i += 1) {
      if (!hits[_i]) {
        return false;
      }
    }

    return true;
  };

  return {
    getLength: getLength,
    getHits: getHits,
    hitAt: hitAt,
    isSunk: isSunk,
    isHitAt: isHitAt
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html {\n  font-size: 62.5%;\n}\n\nbody {\n  font-size: 1.5rem;\n  font-family: \"Roboto\", Arial, Helvetica, sans-serif;\n}\n\nheader {\n  height: 5rem;\n  box-shadow: 3px 3px 10px 3px #ddd;\n}\nheader h1 a {\n  color: #000000;\n  font-size: 2.5rem;\n  font-weight: bold;\n  line-height: 5rem;\n  margin-left: 2.5rem;\n  text-decoration: none;\n}\nheader h1 a:hover {\n  text-decoration: underline;\n}\n\nmain {\n  min-height: calc(100vh - 5rem - 5rem);\n}\n\n.home {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-top: 10rem;\n  gap: 1rem;\n  margin: 0 auto;\n  width: 80%;\n}\n.home button {\n  font-family: inherit;\n  font-size: 2rem;\n  font-weight: 500;\n  text-transform: capitalize;\n  width: 20rem;\n  height: 5rem;\n  border: 1px solid black;\n  border-radius: 0.5rem;\n  box-shadow: 4px 4px 0 0 black;\n  background-color: #fff;\n}\n.home button:hover {\n  cursor: pointer;\n}\n.home button:active {\n  box-shadow: none;\n  transform: translate(4px, 4px);\n}\n.home select {\n  border: 1px solid black;\n  border-radius: 0.5rem;\n  background-color: #fff;\n  font-family: inherit;\n  font-size: 1.6rem;\n  font-weight: 300;\n  width: 20rem;\n  text-align: center;\n}\n\n.game {\n  display: flex;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  padding: 5rem;\n  gap: 5rem;\n}\n\n.board {\n  display: grid;\n  justify-content: center;\n}\n\n.row {\n  display: flex;\n  justify-content: center;\n  border-left: 2px solid #83EB21;\n}\n.row:first-child {\n  border-top: 2px solid #83EB21;\n}\n\n.tile {\n  display: inline-block;\n  border-bottom: 2px solid #83EB21;\n  border-right: 2px solid #83EB21;\n  width: min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12));\n  height: min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12));\n}\n\n@keyframes tilehover {\n  0% {\n    background-color: #ffffff;\n    margin: 1px 0 0 1px;\n    box-shadow: calc(min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 10) calc(min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 10) 0 0 #e6e6e6;\n  }\n  100% {\n    background-color: #b11313;\n    margin: calc(3 * min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 20) 0 0 calc(3 * min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 20);\n    box-shadow: calc(min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 10) calc(min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 10) 0 0 #830e0e;\n  }\n}\n.enemy .water:hover::before {\n  content: \"\";\n  display: inline-block;\n  width: calc(min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 2);\n  height: calc(min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 2);\n  margin: calc(3 * min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 20) 0 0 calc(3 * min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 20);\n  background-color: #ffffff;\n  border-radius: 50%;\n  box-shadow: calc(min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 10) calc(min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 10) 0 0 #e6e6e6;\n}\n.enemy .water:hover::before {\n  animation-name: tilehover;\n  animation-duration: 1s;\n  animation-iteration-count: infinite;\n  animation-direction: alternate;\n  animation-timing-function: linear;\n}\n\n.water {\n  background-color: #122901;\n}\n\n.miss {\n  background-color: #122901;\n}\n.miss::before {\n  content: \"\";\n  display: inline-block;\n  width: calc(min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 2);\n  height: calc(min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 2);\n  margin: calc(3 * min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 20) 0 0 calc(3 * min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 20);\n  background-color: #ffffff;\n  border-radius: 50%;\n  box-shadow: calc(min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 10) calc(min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 10) 0 0 #e6e6e6;\n}\n\n.hit {\n  background-color: #6FC81A;\n}\n.hit::before {\n  content: \"\";\n  display: inline-block;\n  width: calc(min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 2);\n  height: calc(min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 2);\n  margin: calc(3 * min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 20) 0 0 calc(3 * min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 20);\n  background-color: #b11313;\n  border-radius: 50%;\n  box-shadow: calc(min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 10) calc(min(max(3.8461538462vw, (100vh - 5rem - 5rem) / 26), min(8.3333333333vw, (100vh - 5rem - 5rem) / 12)) / 10) 0 0 #830e0e;\n}\n\n.ship {\n  background-color: #6FC81A;\n}\n\n.sunk {\n  background-color: rgba(177, 19, 19, 0.6);\n}\n\n.modal {\n  position: fixed;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.modal .modal-content {\n  background-color: #fff;\n  margin: 15% auto;\n  padding: 20px;\n  border: 1px solid black;\n  border-radius: 1rem;\n  max-width: 50rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  align-items: center;\n}\n.modal .modal-content .modal-title {\n  font-size: 5rem;\n  text-transform: capitalize;\n  text-align: center;\n}\n.modal .modal-content .modal-msg {\n  font-size: 2.5rem;\n  text-transform: capitalize;\n}\n.modal .modal-content button {\n  width: 15rem;\n  line-height: 3rem;\n  font-family: inherit;\n  font-size: 1.5rem;\n  text-transform: capitalize;\n  border: 1px solid black;\n  border-radius: 0.5rem;\n  box-shadow: 3px 3px 0 0 black;\n  background-color: #fff;\n}\n.modal .modal-content button:hover {\n  cursor: pointer;\n}\n.modal .modal-content button:active {\n  box-shadow: none;\n  transform: translate(3px, 3px);\n}\n\nfooter {\n  height: 5rem;\n  line-height: 5rem;\n  text-align: center;\n  box-shadow: 3px -3px 10px 3px #ddd;\n}", "",{"version":3,"sources":["webpack://./src/styles/main.scss"],"names":[],"mappings":"AAgDA;EACE,gBAAA;AA9CF;;AAiDA;EACE,iBAAA;EACA,mDAAA;AA9CF;;AAiDA;EACE,YAxDY;EAyDZ,iCAAA;AA9CF;AAiDI;EACE,cAAA;EACA,iBAAA;EACA,iBAAA;EACA,iBAhEQ;EAiER,mBAAA;EACA,qBAAA;AA/CN;AAiDM;EACE,0BAAA;AA/CR;;AAqDA;EACE,qCAAA;AAlDF;;AAqDA;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,kBAAA;EACA,SAAA;EACA,cAAA;EACA,UAAA;AAlDF;AAmDE;EACE,oBAAA;EACA,eAAA;EACA,gBAAA;EACA,0BAAA;EACA,YAAA;EACA,YAAA;EACA,uBAAA;EACA,qBAAA;EACA,6BAAA;EACA,sBAAA;AAjDJ;AAkDI;EACE,eAAA;AAhDN;AAkDI;EACE,gBAAA;EACA,8BAAA;AAhDN;AAmDE;EACE,uBAAA;EACA,qBAAA;EACA,sBAAA;EACA,oBAAA;EACA,iBAAA;EACA,gBAAA;EACA,YAAA;EACA,kBAAA;AAjDJ;;AAqDA;EACE,aAAA;EACA,6BAAA;EACA,eAAA;EACA,aAAA;EACA,SAAA;AAlDF;;AAqDA;EACE,aAAA;EACA,uBAAA;AAlDF;;AAqDA;EACE,aAAA;EACA,uBAAA;EACA,8BAnIW;AAiFb;AAoDE;EACE,6BAtIS;AAoFb;;AAyDA;EACE,qBAAA;EACA,gCA/IW;EAgJX,+BAhJW;EAiJX,4GAlJS;EAmJT,6GAnJS;AA6FX;;AAvEE;EACE;IAAK,yBAnBG;IAoBN,mBAAA;IACA,yPAAA;EA2EJ;EAzEE;IAAO,yBAtBA;IAuBL,qPAAA;IACA,yPAAA;EA4EJ;AACF;AAlGE;EACE,WAAA;EACA,qBAAA;EACA,sHAAA;EACA,uHAAA;EACA,qPAAA;EACA,yBAVQ;EAWR,kBAAA;EACA,yPAAA;AAoGJ;AAlFI;EACE,yBAAA;EACA,sBAAA;EACA,mCAAA;EACA,8BAAA;EACA,iCAAA;AAoFN;;AAiCA;EACE,yBA3JW;AA6Hb;;AAiCA;EACE,yBA/JW;AAiIb;AA3HE;EACE,WAAA;EACA,qBAAA;EACA,sHAAA;EACA,uHAAA;EACA,qPAAA;EACA,yBAVQ;EAWR,kBAAA;EACA,yPAAA;AA6HJ;;AAwBA;EACE,yBAnKU;AA8IZ;AAzIE;EACE,WAAA;EACA,qBAAA;EACA,sHAAA;EACA,uHAAA;EACA,qPAAA;EACA,yBATO;EAUP,kBAAA;EACA,yPAAA;AA2IJ;;AAeA;EACE,yBAxKU;AA4JZ;;AAeA;EACE,wCAAA;AAZF;;AAeA;EACE,eAAA;EACA,UAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,cAAA;EACA,oCAAA;AAZF;AAcE;EACE,sBAAA;EACA,gBAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,gBAAA;EACA,aAAA;EACA,sBAAA;EACA,SAAA;EACA,mBAAA;AAZJ;AAcI;EACE,eAAA;EACA,0BAAA;EACA,kBAAA;AAZN;AAcI;EACE,iBAAA;EACA,0BAAA;AAZN;AAeI;EACE,YAAA;EACA,iBAAA;EACA,oBAAA;EACA,iBAAA;EACA,0BAAA;EACA,uBAAA;EACA,qBAAA;EACA,6BAAA;EACA,sBAAA;AAbN;AAcM;EACE,eAAA;AAZR;AAcM;EACE,gBAAA;EACA,8BAAA;AAZR;;AAkBA;EACE,YAzOY;EA0OZ,iBA1OY;EA2OZ,kBAAA;EACA,kCAAA;AAfF","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');\n\n$headerHeigt: 5rem;\n$footerHeigt: 5rem;\n$tileSide: calc(min(max((100vw / 26), (100vh - $headerHeigt - $footerHeigt)/ 26), min((100vw / 12), (100vh - $headerHeigt - $footerHeigt)/ 12)));\n$tileBorder: 2px solid #83EB21;\n$waterColor: #122901;\n$shipColor: #6FC81A;\n$missColor: #ffffff;\n$hitColor: #b11313;\n\n@mixin pin($pinColor) {\n  &::before {\n    content: '';\n    display: inline-block;\n    width: calc($tileSide/2);\n    height: calc($tileSide/2);\n    margin: calc(3 * $tileSide/20) 0 0 calc(3 * $tileSide/20);\n    background-color: $pinColor;\n    border-radius: 50%;\n    box-shadow: calc($tileSide/10) calc($tileSide/10) 0 0 darken($pinColor, $amount: 10%);\n\n  }\n}\n\n@mixin hoverTarget {\n  @keyframes tilehover {\n    0% { background-color: $missColor;\n      margin: 1px 0 0 1px;\n      box-shadow: calc($tileSide/10) calc($tileSide/10) 0 0 darken($missColor, $amount: 10%);\n    }\n    100% { background-color: $hitColor;\n      margin: calc(3 * $tileSide/20) 0 0 calc(3 * $tileSide/20);\n      box-shadow: calc($tileSide/10) calc($tileSide/10) 0 0 darken($hitColor, $amount: 10%);\n    }\n  }\n  &:hover {\n    @include pin($missColor);\n    &::before {\n      animation-name: tilehover;\n      animation-duration: 1s;\n      animation-iteration-count: infinite;\n      animation-direction: alternate;\n      animation-timing-function: linear;\n    }\n  }\n}\n\nhtml {\n  font-size: 62.5%;\n}\n\nbody {\n  font-size: 1.5rem;\n  font-family: 'Roboto', Arial, Helvetica, sans-serif;\n}\n\nheader {\n  height: $headerHeigt;\n  box-shadow: 3px 3px 10px 3px #ddd;\n\n  h1 {\n    a {\n      color: #000000;\n      font-size: 2.5rem;\n      font-weight: bold;\n      line-height: $headerHeigt;\n      margin-left: calc($headerHeigt/2);\n      text-decoration: none;\n      \n      &:hover {\n        text-decoration: underline;\n      }\n    }\n  }\n}\n\nmain {\n  min-height: calc(100vh - $headerHeigt - $footerHeigt);\n}\n\n.home {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-top: 10rem;\n  gap: 1rem;\n  margin: 0 auto;\n  width: 80%;\n  button {\n    font-family: inherit;\n    font-size: 2rem;\n    font-weight: 500;\n    text-transform: capitalize;\n    width: 20rem;\n    height: 5rem;\n    border: 1px solid black;\n    border-radius: 0.5rem;\n    box-shadow: 4px 4px 0 0 darken(black, $amount: 10%);\n    background-color: #fff;\n    &:hover {\n      cursor: pointer;\n    }\n    &:active {\n      box-shadow: none;\n      transform: translate(4px, 4px);\n    }\n  }\n  select {\n    border: 1px solid black;\n    border-radius: 0.5rem;\n    background-color: #fff;\n    font-family: inherit;\n    font-size: 1.6rem;\n    font-weight: 300;\n    width: 20rem;\n    text-align: center;\n  }\n}\n\n.game {\n  display: flex;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  padding: 5rem;\n  gap: 5rem;\n}\n\n.board {\n  display: grid;\n  justify-content: center;\n}\n\n.row {\n  display: flex;\n  justify-content: center;\n  border-left: $tileBorder;\n  \n  &:first-child{\n    border-top: $tileBorder;\n\n  }\n  \n\n}\n  \n.tile {\n  display: inline-block;\n  border-bottom: $tileBorder;\n  border-right: $tileBorder;\n  width: $tileSide;\n  height: $tileSide;\n}\n\n.enemy {\n  .water {\n    @include hoverTarget();\n  }\n}\n\n.water {\n  background-color: $waterColor;\n}\n\n.miss {\n  background-color: $waterColor;\n  @include pin($missColor);\n}\n\n.hit {\n  background-color: $shipColor;\n  @include pin($hitColor);\n}\n\n.ship {\n  background-color: $shipColor;\n}\n\n.sunk {\n  background-color: rgba($hitColor, $alpha: 0.6);\n}\n\n.modal {\n  position: fixed;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: rgba($color: #000000, $alpha: 0.5);\n\n  .modal-content {\n    background-color: #fff;\n    margin: 15% auto;\n    padding: 20px;\n    border: 1px solid black;\n    border-radius: 1rem;\n    max-width: 50rem;\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n    align-items: center;\n\n    .modal-title {\n      font-size: 5rem;\n      text-transform: capitalize;\n      text-align: center;\n    }\n    .modal-msg {\n      font-size: 2.5rem;\n      text-transform: capitalize;\n    }\n\n    button {\n      width: 15rem;\n      line-height: 3rem;\n      font-family: inherit;\n      font-size: 1.5rem;\n      text-transform: capitalize;\n      border: 1px solid black;\n      border-radius: 0.5rem;\n      box-shadow: 3px 3px 0 0 darken(black, $amount: 10%);\n      background-color: #fff;\n      &:hover {\n        cursor: pointer;\n      }\n      &:active {\n        box-shadow: none;\n        transform: translate(3px, 3px);\n      }\n    }\n  }\n}\n\nfooter {\n  height: $footerHeigt;\n  line-height: $footerHeigt;\n  text-align: center;\n  box-shadow: 3px -3px 10px 3px #ddd;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/reset.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/reset.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}", "",{"version":3,"sources":["webpack://./src/styles/reset.css"],"names":[],"mappings":"AAAA;;;CAGC;;AAED;;;;;;;;;;;;;CAaC,SAAS;CACT,UAAU;CACV,SAAS;CACT,eAAe;CACf,aAAa;CACb,wBAAwB;AACzB;AACA,gDAAgD;AAChD;;CAEC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,gBAAgB;AACjB;AACA;CACC,YAAY;AACb;AACA;;CAEC,WAAW;CACX,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,iBAAiB;AAClB","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/pubsub-js/src/pubsub.js":
/*!**********************************************!*\
  !*** ./node_modules/pubsub-js/src/pubsub.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
/**
 * Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk
 * License: MIT - http://mrgnrdrck.mit-license.org
 *
 * https://github.com/mroderick/PubSubJS
 */

(function (root, factory){
    'use strict';

    var PubSub = {};

    if (root.PubSub) {
        PubSub = root.PubSub;
        console.warn("PubSub already loaded, using existing version");
    } else {
        root.PubSub = PubSub;
        factory(PubSub);
    }
    // CommonJS and Node.js module support
    if (true){
        if (module !== undefined && module.exports) {
            exports = module.exports = PubSub; // Node.js specific `module.exports`
        }
        exports.PubSub = PubSub; // CommonJS module 1.1.1 spec
        module.exports = exports = PubSub; // CommonJS
    }
    // AMD support
    /* eslint-disable no-undef */
    else {}

}(( typeof window === 'object' && window ) || this, function (PubSub){
    'use strict';

    var messages = {},
        lastUid = -1,
        ALL_SUBSCRIBING_MSG = '*';

    function hasKeys(obj){
        var key;

        for (key in obj){
            if ( Object.prototype.hasOwnProperty.call(obj, key) ){
                return true;
            }
        }
        return false;
    }

    /**
     * Returns a function that throws the passed exception, for use as argument for setTimeout
     * @alias throwException
     * @function
     * @param { Object } ex An Error object
     */
    function throwException( ex ){
        return function reThrowException(){
            throw ex;
        };
    }

    function callSubscriberWithDelayedExceptions( subscriber, message, data ){
        try {
            subscriber( message, data );
        } catch( ex ){
            setTimeout( throwException( ex ), 0);
        }
    }

    function callSubscriberWithImmediateExceptions( subscriber, message, data ){
        subscriber( message, data );
    }

    function deliverMessage( originalMessage, matchedMessage, data, immediateExceptions ){
        var subscribers = messages[matchedMessage],
            callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,
            s;

        if ( !Object.prototype.hasOwnProperty.call( messages, matchedMessage ) ) {
            return;
        }

        for (s in subscribers){
            if ( Object.prototype.hasOwnProperty.call(subscribers, s)){
                callSubscriber( subscribers[s], originalMessage, data );
            }
        }
    }

    function createDeliveryFunction( message, data, immediateExceptions ){
        return function deliverNamespaced(){
            var topic = String( message ),
                position = topic.lastIndexOf( '.' );

            // deliver the message as it is now
            deliverMessage(message, message, data, immediateExceptions);

            // trim the hierarchy and deliver message to each level
            while( position !== -1 ){
                topic = topic.substr( 0, position );
                position = topic.lastIndexOf('.');
                deliverMessage( message, topic, data, immediateExceptions );
            }

            deliverMessage(message, ALL_SUBSCRIBING_MSG, data, immediateExceptions);
        };
    }

    function hasDirectSubscribersFor( message ) {
        var topic = String( message ),
            found = Boolean(Object.prototype.hasOwnProperty.call( messages, topic ) && hasKeys(messages[topic]));

        return found;
    }

    function messageHasSubscribers( message ){
        var topic = String( message ),
            found = hasDirectSubscribersFor(topic) || hasDirectSubscribersFor(ALL_SUBSCRIBING_MSG),
            position = topic.lastIndexOf( '.' );

        while ( !found && position !== -1 ){
            topic = topic.substr( 0, position );
            position = topic.lastIndexOf( '.' );
            found = hasDirectSubscribersFor(topic);
        }

        return found;
    }

    function publish( message, data, sync, immediateExceptions ){
        message = (typeof message === 'symbol') ? message.toString() : message;

        var deliver = createDeliveryFunction( message, data, immediateExceptions ),
            hasSubscribers = messageHasSubscribers( message );

        if ( !hasSubscribers ){
            return false;
        }

        if ( sync === true ){
            deliver();
        } else {
            setTimeout( deliver, 0 );
        }
        return true;
    }

    /**
     * Publishes the message, passing the data to it's subscribers
     * @function
     * @alias publish
     * @param { String } message The message to publish
     * @param {} data The data to pass to subscribers
     * @return { Boolean }
     */
    PubSub.publish = function( message, data ){
        return publish( message, data, false, PubSub.immediateExceptions );
    };

    /**
     * Publishes the message synchronously, passing the data to it's subscribers
     * @function
     * @alias publishSync
     * @param { String } message The message to publish
     * @param {} data The data to pass to subscribers
     * @return { Boolean }
     */
    PubSub.publishSync = function( message, data ){
        return publish( message, data, true, PubSub.immediateExceptions );
    };

    /**
     * Subscribes the passed function to the passed message. Every returned token is unique and should be stored if you need to unsubscribe
     * @function
     * @alias subscribe
     * @param { String } message The message to subscribe to
     * @param { Function } func The function to call when a new message is published
     * @return { String }
     */
    PubSub.subscribe = function( message, func ){
        if ( typeof func !== 'function'){
            return false;
        }

        message = (typeof message === 'symbol') ? message.toString() : message;

        // message is not registered yet
        if ( !Object.prototype.hasOwnProperty.call( messages, message ) ){
            messages[message] = {};
        }

        // forcing token as String, to allow for future expansions without breaking usage
        // and allow for easy use as key names for the 'messages' object
        var token = 'uid_' + String(++lastUid);
        messages[message][token] = func;

        // return token for unsubscribing
        return token;
    };

    PubSub.subscribeAll = function( func ){
        return PubSub.subscribe(ALL_SUBSCRIBING_MSG, func);
    };

    /**
     * Subscribes the passed function to the passed message once
     * @function
     * @alias subscribeOnce
     * @param { String } message The message to subscribe to
     * @param { Function } func The function to call when a new message is published
     * @return { PubSub }
     */
    PubSub.subscribeOnce = function( message, func ){
        var token = PubSub.subscribe( message, function(){
            // before func apply, unsubscribe message
            PubSub.unsubscribe( token );
            func.apply( this, arguments );
        });
        return PubSub;
    };

    /**
     * Clears all subscriptions
     * @function
     * @public
     * @alias clearAllSubscriptions
     */
    PubSub.clearAllSubscriptions = function clearAllSubscriptions(){
        messages = {};
    };

    /**
     * Clear subscriptions by the topic
     * @function
     * @public
     * @alias clearAllSubscriptions
     * @return { int }
     */
    PubSub.clearSubscriptions = function clearSubscriptions(topic){
        var m;
        for (m in messages){
            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0){
                delete messages[m];
            }
        }
    };

    /**
       Count subscriptions by the topic
     * @function
     * @public
     * @alias countSubscriptions
     * @return { Array }
    */
    PubSub.countSubscriptions = function countSubscriptions(topic){
        var m;
        // eslint-disable-next-line no-unused-vars
        var token;
        var count = 0;
        for (m in messages) {
            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {
                for (token in messages[m]) {
                    count++;
                }
                break;
            }
        }
        return count;
    };


    /**
       Gets subscriptions by the topic
     * @function
     * @public
     * @alias getSubscriptions
    */
    PubSub.getSubscriptions = function getSubscriptions(topic){
        var m;
        var list = [];
        for (m in messages){
            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0){
                list.push(m);
            }
        }
        return list;
    };

    /**
     * Removes subscriptions
     *
     * - When passed a token, removes a specific subscription.
     *
	 * - When passed a function, removes all subscriptions for that function
     *
	 * - When passed a topic, removes all subscriptions for that topic (hierarchy)
     * @function
     * @public
     * @alias subscribeOnce
     * @param { String | Function } value A token, function or topic to unsubscribe from
     * @example // Unsubscribing with a token
     * var token = PubSub.subscribe('mytopic', myFunc);
     * PubSub.unsubscribe(token);
     * @example // Unsubscribing with a function
     * PubSub.unsubscribe(myFunc);
     * @example // Unsubscribing from a topic
     * PubSub.unsubscribe('mytopic');
     */
    PubSub.unsubscribe = function(value){
        var descendantTopicExists = function(topic) {
                var m;
                for ( m in messages ){
                    if ( Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0 ){
                        // a descendant of the topic exists:
                        return true;
                    }
                }

                return false;
            },
            isTopic    = typeof value === 'string' && ( Object.prototype.hasOwnProperty.call(messages, value) || descendantTopicExists(value) ),
            isToken    = !isTopic && typeof value === 'string',
            isFunction = typeof value === 'function',
            result = false,
            m, message, t;

        if (isTopic){
            PubSub.clearSubscriptions(value);
            return;
        }

        for ( m in messages ){
            if ( Object.prototype.hasOwnProperty.call( messages, m ) ){
                message = messages[m];

                if ( isToken && message[value] ){
                    delete message[value];
                    result = value;
                    // tokens are unique, so we can just stop here
                    break;
                }

                if (isFunction) {
                    for ( t in message ){
                        if (Object.prototype.hasOwnProperty.call(message, t) && message[t] === value){
                            delete message[t];
                            result = true;
                        }
                    }
                }
            }
        }

        return result;
    };
}));


/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/reset.css":
/*!******************************!*\
  !*** ./src/styles/reset.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./reset.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/reset.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_reset_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/reset.css */ "./src/styles/reset.css");
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ "./src/app.js");



_app__WEBPACK_IMPORTED_MODULE_2__["default"].start();
})();

/******/ })()
;
//# sourceMappingURL=bundle.d5d7d787d02fc3a6fe69.js.map