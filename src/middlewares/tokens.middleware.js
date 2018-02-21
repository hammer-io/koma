/* eslint-disable import/prefer-default-export */
import { check } from 'express-validator/check';

export function checkCreateNewToken() {
  return [
    check('projectId').exists().withMessage('projectId field is required.')
  ];
}
