import * as mammoth from 'mammoth';
import fetch from 'node-fetch';
import * as pdfParse from 'pdf-parse';

export default async function documentToText(url: string) {
  const response = await fetch(url);
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
}

/**
 * docx转换为文本
 */
async function docxToText(buffer: any) {
  return mammoth.extractRawText({ buffer }).then((result) => {
    return result.value;
  });
}

/**
 * pdf转换为文本
 */
async function pdfToText(buffer: any) {
  const data = await pdfParse(buffer);
  return data.text;
}

/**
 * 获取文件名称和后缀
 */
function getFileNameAndSuffix(response: Response) {
  let disposition = response.headers.get('content-disposition');
  let contentType = response.headers.get('content-type');

  // MIME类型到文件扩展名的映射表
  const extensionMap = {
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      'docx',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'text/plain': 'txt',
    'application/zip': 'zip',
  };
  if (!disposition) {
    if (Array.isArray(contentType)) {
      contentType = contentType[0];
    }
    // @ts-ignore
    let suffix = extensionMap[contentType] || '.unknown';
    return { fileName: '', suffix: suffix };
  }
  if (Array.isArray(disposition)) {
    disposition = disposition[0];
  }
  // @ts-ignore
  const fileName = disposition.split('filename=')[1].replace(/"/g, '');
  const suffix = fileName.split('.').pop();
  return { fileName, suffix };
}
