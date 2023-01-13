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
exports.router = void 0;
const express_1 = require("express");
const check_health_1 = require("../check-health/services/check-health");
const router = (0, express_1.Router)();
exports.router = router;
// eslint-disable-next-line @typescript-eslint/ban-types
router.use((error, _req, res, next) => {
    if (error) {
        res.status(500).send(error.message);
    }
    next();
});
router.get('/', (_req, res) => {
    res.send('Bienvenido a nuestra API REST');
});
router.get('/checkhealth', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Alguien ha solicitado un checkhealth');
    const result = yield (0, check_health_1.CheckHealth)();
    res.send(result);
}));
