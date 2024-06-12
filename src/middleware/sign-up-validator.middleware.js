import Joi from 'joi';
import { MIN_PASSWORD_LENGTH } from '../constants/auth.constant.js';

const signupschema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': '이메일을 입력해 주세요',
    'string.email': '이메일 형식이 올바르지 않습니다.',
  
  }),
  password: Joi.string().required().min(MIN_PASSWORD_LENGTH).messages({
    'any.required': '비밀번호를 입력해 주세요',
    'string.min': '비밀번호는 6자리 이상이어야 합니다.',
  }),
  passwordConfirm: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.required': '비밀번호 확인이 필요합니다.',
    'any.only': '비밀번호가 일치하지 않습니다.',
  }),
  name: Joi.string().required().messages({
    'any.required': '이름을 입력해 주세요.',
  }),
});

export const SignUpValidator = async (req, res, next) => {
  try {
    await signupschema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

