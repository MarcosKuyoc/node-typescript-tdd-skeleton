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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoostrapExpress = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("../modules/routes");
class BoostrapExpress {
    constructor(port) {
        this.port = port;
        this.server = (0, express_1.default)();
        this.init();
    }
    init() {
        this.server.use(express_1.default.json());
        this.server.use((0, cors_1.default)());
        this.server.use(routes_1.router);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.httpServer = yield this.server.listen(this.port);
                console.log(`Iniciando la aplicacion en el puerto ${this.port}`);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getHTTPServer() {
        return this.httpServer;
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.httpServer) {
                    yield this.httpServer.close();
                    console.info('Cerrando la aplicación');
                }
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
}
exports.BoostrapExpress = BoostrapExpress;
