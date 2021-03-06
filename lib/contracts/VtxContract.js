"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../vtxcache/actions/actions");
var get_tx_id_1 = require("../utils/get_tx_id");
var actions_2 = require("./actions/actions");
var js_sha3_1 = require("js-sha3");
var actions_3 = require("../events/actions/actions");
var address_checker_1 = require("../utils/address_checker");
var hexReg = /^[a-fA-F0-9]+$/;
var methodReg = /^[a-zA-Z0-9_]+$/;
exports.getContractMaterial = function (state, contract, address) {
    var entity = VtxContract.entity_sig(contract, address);
    return {
        cache: state.vtxcache.store[entity] || {},
        events: state.events[entity],
        valid: state.contracts.instances[contract]
            ?
                state.contracts.instances[contract][address_checker_1.address_checker(address)]
                    ?
                        state.contracts.instances[contract][address_checker_1.address_checker(address)].valid
                    :
                        null
            :
                null,
        coinbase: state.vtxconfig.coinbase
    };
};
var VtxContract = /** @class */ (function () {
    function VtxContract(dispatch, material, instance, name, address, abi, bin, constructor_bin) {
        var _this = this;
        this._methods = {};
        this._events = {};
        this.generate_transaction_calls = function () {
            var e_1, _a;
            var _loop_1 = function (method) {
                if (method.type === 'function' && method.constant === false) {
                    _this._methods[method.name] = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        if (!_this.valid)
                            throw new Error("Calling Transaction call on invalid contract: bytecode does not match the one present on chain (" + _this.valid + ")");
                        var tx_id = get_tx_id_1.get_tx_id();
                        _this._dispatch(actions_2.ContractsSend(function () { return __awaiter(_this, void 0, void 0, function () {
                            var splitted_args, res;
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        splitted_args = VtxContract.tx_inspect_args(this.material.coinbase, args);
                                        return [4 /*yield*/, (_a = (_b = this._contract.methods)[method.name].apply(_b, __spread(splitted_args[0]))).send.apply(_a, __spread(splitted_args[1]))];
                                    case 1:
                                        res = (_c.sent());
                                        return [2 /*return*/, res.transactionHash];
                                }
                            });
                        }); }, tx_id, method.name, args, _this._name, _this._address));
                        return tx_id;
                    };
                }
            };
            try {
                for (var _b = __values(_this._abi), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var method = _c.value;
                    _loop_1(method);
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
        this.generate_constant_calls = function () {
            var e_2, _a;
            var _loop_2 = function (method) {
                if (method.type === 'function' && method.constant === true) {
                    // TODO Compute return value
                    _this._methods[method.name] = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        if (!_this.valid)
                            throw new Error("Calling Constant call on invalid contract: bytecode does not match the one present on chain (" + _this.valid + ")");
                        // TODO Argument check;
                        var sig = VtxContract.sig.apply(VtxContract, __spread([_this._name, _this._address, method.name], args));
                        if (_this.material.cache[sig] === undefined) {
                            // TODO compute generic argument from abi
                            // tslint:disable-next-line
                            var cb = function (block) { return __awaiter(_this, void 0, void 0, function () {
                                var splitted_args;
                                var _a, _b;
                                return __generator(this, function (_c) {
                                    splitted_args = VtxContract.const_inspect_args(block, args);
                                    return [2 /*return*/, (_a = (_b = this._contract.methods)[method.name].apply(_b, __spread(splitted_args[0]))).call.apply(_a, __spread(splitted_args[1]))];
                                });
                            }); };
                            _this._dispatch(actions_1.VtxcacheCreate(_this._entity_signature, sig, cb));
                            return undefined;
                        }
                        else if (_this.material.cache[sig].required === false) {
                            _this._dispatch(actions_1.VtxcacheSetRequired(_this._entity_signature, sig));
                        }
                        if (_this.material.cache[sig].error) {
                            return {
                                error: _this.material.cache[sig].error,
                                block: _this.material.cache[sig].block
                            };
                        }
                        return _this.material.cache[sig].data;
                    };
                }
            };
            try {
                for (var _b = __values(_this._abi), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var method = _c.value;
                    _loop_2(method);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        this.generate_event_calls = function () {
            var e_3, _a;
            var _loop_3 = function (event_1) {
                if (event_1.type === 'event') {
                    _this._events[event_1.name] = function (args) {
                        if (!_this.valid)
                            throw new Error("Calling Event call on invalid contract: bytecode does not match the one present on chain (" + _this.valid + ")");
                        var sig = VtxContract.event_sig(_this._name, _this._address, event_1.name, args);
                        var followed = _this.material.events ? _this.material.events.followed[sig] : undefined;
                        if (followed === undefined) {
                            _this._dispatch(actions_3.EventsFollow(_this._entity_signature, event_1.name, args, _this._name, _this._address, sig));
                            return [];
                        }
                        return _this.material.events.data[sig] || [];
                    };
                }
            };
            try {
                for (var _b = __values(_this._abi), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var event_1 = _c.value;
                    _loop_3(event_1);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
        this._dispatch = dispatch;
        this._contract = instance;
        this._name = name;
        this._address = address_checker_1.address_checker(address);
        this._abi = abi;
        this._entity_signature = VtxContract.entity_sig(name, address);
        this.material = material;
        var hex_begin = 0;
        if (bin && (hexReg.test(bin) || hexReg.test(bin.slice((hex_begin = 2))))) {
            this._bin = bin.slice(hex_begin).toLowerCase();
        }
        hex_begin = 0;
        if (constructor_bin && (hexReg.test(constructor_bin) || hexReg.test(constructor_bin.slice((hex_begin = 2))))) {
            this._constructor_bin = constructor_bin.slice(hex_begin).toLowerCase();
        }
        this.generate_constant_calls();
        this.generate_transaction_calls();
        this.generate_event_calls();
    }
    VtxContract.entity_sig = function (name, address) {
        return name + "@" + address_checker_1.address_checker(address);
    };
    Object.defineProperty(VtxContract.prototype, "address", {
        get: function () {
            return this._address;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VtxContract.prototype, "abi", {
        get: function () {
            return this._abi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VtxContract.prototype, "web3_instance", {
        get: function () {
            return this._contract;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VtxContract.prototype, "bin", {
        get: function () {
            return this._bin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VtxContract.prototype, "constructor_bin", {
        get: function () {
            return this._constructor_bin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VtxContract.prototype, "fn", {
        get: function () {
            return this._methods;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VtxContract.prototype, "events", {
        get: function () {
            return this._events;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VtxContract.prototype, "valid", {
        get: function () {
            return this.material.valid;
        },
        enumerable: true,
        configurable: true
    });
    VtxContract.event_sig = function (contract_name, contract_address, method_name, args) {
        var e_4, _a;
        var payload = "EVENT:" + contract_name + ":" + contract_address + ":" + method_name;
        if (args) {
            try {
                for (var _b = __values(Object.keys(args)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var arg = _c.value;
                    switch (typeof arg) {
                        case 'number':
                        case 'string':
                            payload += ":" + arg;
                            break;
                        case 'object':
                        default:
                            payload += ":" + JSON.stringify(arg);
                    }
                    switch (typeof args[arg]) {
                        case 'number':
                        case 'string':
                            payload += ":" + args[arg];
                            break;
                        case 'object':
                        default:
                            payload += ":" + JSON.stringify(args[arg]);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        return js_sha3_1.keccak256("0x" + new Buffer(payload).toString('hex'));
    };
    VtxContract.sig = function (contract_name, contract_address, method_name) {
        var e_5, _a;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var payload = contract_name + ":" + contract_address + ":" + method_name;
        try {
            for (var args_1 = __values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
                var arg = args_1_1.value;
                switch (typeof arg) {
                    case 'number':
                    case 'string':
                        payload += ":" + arg;
                        break;
                    case 'object':
                    default:
                        payload += ":" + JSON.stringify(arg);
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (args_1_1 && !args_1_1.done && (_a = args_1.return)) _a.call(args_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return js_sha3_1.keccak256("0x" + new Buffer(payload).toString('hex'));
    };
    VtxContract.tx_inspect_args = function (coinbase, args) {
        if (args.length === 0)
            return [[], [{ from: coinbase }]];
        var last = args[args.length - 1];
        if (typeof last === 'object' && (last.from !== undefined
            || last.gasPrice !== undefined
            || last.gas !== undefined
            || last.value !== undefined)) {
            return [
                args.slice(0, args.length - 1),
                [args[args.length - 1]]
            ];
        }
        else {
            return [args, [{ from: coinbase }]];
        }
    };
    VtxContract.const_inspect_args = function (block, args) {
        if (args.length === 0)
            return [[], [{}, block]];
        var last = args[args.length - 1];
        if (typeof last === 'object' && (last.from !== undefined
            || last.gasPrice !== undefined
            || last.gas !== undefined)) {
            return [args.slice(0, args.length - 1), [args[args.length - 1], block]];
        }
        else {
            return [args, [{}, block]];
        }
    };
    VtxContract.getPastEvents = function (web3, abi, address) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        return __awaiter(void 0, void 0, void 0, function () {
            var contract;
            return __generator(this, function (_a) {
                contract = new web3.eth.Contract(abi, address);
                return [2 /*return*/, contract.getPastEvents.apply(contract, __spread(args))];
            });
        });
    };
    return VtxContract;
}());
exports.VtxContract = VtxContract;
//# sourceMappingURL=VtxContract.js.map