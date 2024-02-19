import { CryptoUtil } from '../utils/crypto';
import fetch from 'node-fetch';

/**
 * 失信核查
 */
export async function dishonestCheck(searchKey: string) {
  let timespan = Math.round(Date.now() / 1000);
  // @ts-ignore
  let token = getToken(
    process.env.QCC_KEY,
    timespan,
    process.env.QCC_SECRET_KEY
  );
  let url = `https://api.qichacha.com/ShixinCheck/GetList?key=${process.env.QCC_KEY}&searchKey=${searchKey}`;
  const response = await fetch(url, {
    method: 'GET',
    // @ts-ignore
    headers: {
      Token: token,
      Timespan: timespan,
    },
  });
  const data = await response.json();
  const { Result } = data;
  return Result.Data || [];
}

/**
 * 经营异常核查
 */
export async function abnormalCheck(searchKey: string) {
  let timespan = Math.round(Date.now() / 1000);
  // @ts-ignore
  let token = getToken(
    process.env.QCC_KEY,
    timespan,
    process.env.QCC_SECRET_KEY
  );
  let url = `https://api.qichacha.com/ExceptionCheck/GetList?key=${process.env.QCC_KEY}&searchKey=${searchKey}`;
  const response = await fetch(url, {
    method: 'GET',
    // @ts-ignore
    headers: {
      Token: token,
      Timespan: timespan,
    },
  });
  const data = await response.json();
  const { Result } = data;
  return Result.Data || [];
}

/**
 * 严重违法核查
 */
export async function illegalCheck(searchKey: string) {
  let timespan = Math.round(Date.now() / 1000);
  // @ts-ignore
  let token = getToken(
    process.env.QCC_KEY,
    timespan,
    process.env.QCC_SECRET_KEY
  );
  let url = `https://api.qichacha.com/SeriousIllegalCheck/GetList?key=${process.env.QCC_KEY}&searchKey=${searchKey}`;
  const response = await fetch(url, {
    method: 'GET',
    // @ts-ignore
    headers: {
      Token: token,
      Timespan: timespan,
    },
  });
  console.log(3333, response);

  const data = await response.json();
  console.log(66666, data);

  const { Result } = data;
  return Result.Data || [];
}

/**
 * 裁判文书核查
 */
export async function judgmentDocCheck(searchKey: string) {
  let timespan = Math.round(Date.now() / 1000);
  // @ts-ignore
  let token = getToken(
    process.env.QCC_KEY,
    timespan,
    process.env.QCC_SECRET_KEY
  );
  let url = `https://api.qichacha.com/JudgmentDocCheck/GetList?key=${process.env.QCC_KEY}&searchKey=${searchKey}`;
  const response = await fetch(url, {
    method: 'GET',
    // @ts-ignore
    headers: {
      Token: token,
      Timespan: timespan,
    },
  });
  const data = await response.json();
  const { Result } = data;
  return Result.Data || [];
}

/**
 * 获取token
 * Md5(key+Timespan+SecretKey) 加密的32位大写字符串
 */
function getToken(key: any, timespan: number, secretKey: any) {
  return CryptoUtil.hashing(key + timespan + secretKey).toUpperCase();
}
