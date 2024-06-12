// error.middleware.js

import { HttpError } from '../errors/http.error.js';

// 에러 처리 미들웨어
export function errorHandler(err, req, res, next) {
  // HttpError 인스턴스인 경우
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
  } else {
    // 기타 오류 처리
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


