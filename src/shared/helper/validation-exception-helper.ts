import {
  DefaultException,
  ExceptionTypes,
} from './';

export class ValidationException extends DefaultException {
  constructor(validation: any) {
    super({
      type: ExceptionTypes.USER,
      code: 'VALIDATION',
      data: validation,
    });
  }
}
