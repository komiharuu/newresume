import { MIN_INTRODUCE_LENGTH } from '../constants/post.constant.js';
import Joi from "joi";

const ResumeSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "제목을 입력해 주세요.",
  }),
  introduce: Joi.string().required().min(MIN_INTRODUCE_LENGTH).messages({
    "any.required": "자기소개를 입력해 주세요.",
    "string.min": '자기소개는 150자 이상으로 입력해주세요'
  }),

});

export const ResumeValidator = async (req, res, next) => {
  try {
    await ResumeSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};