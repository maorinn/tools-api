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
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
require("dotenv/config");
const documentToText_1 = require("./tools/documentToText");
const app = new hono_1.Hono();
app.get('/', (c) => {
    return c.text('Hello Hono!');
});
app.post('/documentToText', (c) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileUrl } = yield c.req.json();
    return c.json({
        code: 0,
        data: yield (0, documentToText_1.default)(fileUrl),
    });
}));
const port = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port,
});
