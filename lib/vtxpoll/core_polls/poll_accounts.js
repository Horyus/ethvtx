"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var ready_1 = require("../../utils/ready");
var bignumber_js_1 = require("bignumber.js");
var actions_1 = require("../../accounts/actions/actions");
var polling = false;
var last_block = null;
var null_accounts = function (state) {
    var e_1, _a;
    try {
        for (var _b = __values(Object.keys(state.accounts.accounts)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var account = _c.value;
            if (state.accounts.accounts[account].balance === null)
                return true;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
};
exports.poll_accounts = function (state, emit) { return __awaiter(_this, void 0, void 0, function () {
    var e_2, _a, web3, _b, _c, account, balance, _d, transaction_count, contract, code, e_2_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (!(ready_1.ready(state) && !polling)) return [3 /*break*/, 12];
                polling = true;
                if (last_block === null) {
                    if (!state.blocks.current_height) {
                        last_block = state.blocks.initial_height;
                    }
                    else {
                        last_block = state.blocks.current_height;
                    }
                }
                else {
                    if ((state.blocks.current_height === null || last_block >= state.blocks.current_height)
                        && !null_accounts(state)) {
                        polling = false;
                        return [2 /*return*/];
                    }
                    else {
                        last_block = state.blocks.current_height;
                    }
                }
                web3 = state.vtxconfig.web3;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 9, 10, 11]);
                _b = __values(Object.keys(state.accounts.accounts)), _c = _b.next();
                _e.label = 2;
            case 2:
                if (!!_c.done) return [3 /*break*/, 8];
                account = _c.value;
                _d = bignumber_js_1.BigNumber.bind;
                return [4 /*yield*/, web3.eth.getBalance(account)];
            case 3:
                balance = new (_d.apply(bignumber_js_1.BigNumber, [void 0, _e.sent()]))();
                return [4 /*yield*/, web3.eth.getTransactionCount(account)];
            case 4:
                transaction_count = _e.sent();
                contract = undefined;
                if (!(state.accounts.accounts[account].contract === null)) return [3 /*break*/, 6];
                return [4 /*yield*/, web3.eth.getCode(account)];
            case 5:
                code = (_e.sent());
                contract = code !== '0x' && code !== '0x0';
                _e.label = 6;
            case 6:
                if (state.accounts.accounts[account].balance !== balance || state.accounts.accounts[account].transaction_count !== transaction_count) {
                    emit(actions_1.AccountsSetInfos(account, balance, transaction_count, contract));
                }
                _e.label = 7;
            case 7:
                _c = _b.next();
                return [3 /*break*/, 2];
            case 8: return [3 /*break*/, 11];
            case 9:
                e_2_1 = _e.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 11];
            case 10:
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 11:
                polling = false;
                _e.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.poll_accounts_interval = 5;