import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from '../shared/domain/errors/domain.error';

@Catch(DomainError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      error: 'Bad Request',
      message: exception.message,
      code: exception.code,
    });
  }
}
