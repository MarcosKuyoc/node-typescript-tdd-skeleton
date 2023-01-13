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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const boostrap_express_1 = require("./adapters/boostrap-express");
class App {
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const PORT = process.env.PORT || '3000';
            const server = new boostrap_express_1.BoostrapExpress(PORT);
            yield server.listen();
            console.log(`http://localhost:${PORT}`);
        });
    }
}
exports.default = App;