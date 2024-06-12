import { HttpError } from '../errors/http.error.js';

// 에러 처리 Middleware
const errorHandler = (error, req, res, next) => {
  if (error instanceof HttpError.BadRequest) {
    return res.status(HttpError.BadRequest.status).json({ error: error.message });
  } else if (error instanceof HttpError.Unauthorized) {
    return res.status(HttpError.Unauthorized.status).json({ error: error.message });
  } else if (error instanceof HttpError.Forbidden) {
    return res.status(HttpError.Forbidden.status).json({ error: error.message });
  } else if (error instanceof HttpError.NotFound) {
    return res.status(HttpError.NotFound.status).json({ error: error.message });
  } else if (error instanceof HttpError.Conflict) {
    return res.status(HttpError.Conflict.status).json({ error: error.message });
  } else if (error instanceof HttpError.InternalServerError) {
    return res.status(HttpError.InternalServerError.status).json({ error: error.message });
  } else {
    // 기타 에러의 경우 500 에러로 처리
    console.error(error);
    return res.status(HttpError.InternalServerError.status).json({ error: '서버 오류' });
  }
};

export { errorHandler };
