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
const mammoth = require("mammoth");
const fetch = require("node-fetch");
const pdfParse = require("pdf-parse");
function documentToText(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        const buffer = response.buffer();
        // @ts-ignore
        const { suffix } = getFileNameAndSuffix(response);
        switch (suffix) {
            case 'docx':
                return docxToText(buffer);
            case 'pdf':
                return pdfToText(buffer);
            default:
                return '不支持的文件类型';
        }
    });
}
exports.default = documentToText;
/**
 * docx转换为文本
 */
function docxToText(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        return mammoth.extractRawText({ buffer }).then((result) => {
            return result.value;
        });
    });
}
/**
 * pdf转换为文本
 */
function pdfToText(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield pdfParse(buffer);
        return data.text;
    });
}
/**
 * 获取文件名称和后缀
 */
function getFileNameAndSuffix(response) {
    const disposition = response.headers.get('content-disposition');
    const contentType = response.headers.get('content-type');
    // MIME类型到文件扩展名的映射表
    const extensionMap = {
        'application/pdf': 'pdf',
        'application/msword': 'doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'text/plain': 'txt',
        'application/zip': 'zip',
    };
    if (!disposition) {
        // @ts-ignore
        let suffix = extensionMap[contentType] || '.unknown';
        return { fileName: '', suffix: suffix };
    }
    const fileName = disposition.split('filename=')[1];
    const suffix = fileName.split('.').pop();
    return { fileName, suffix };
}
