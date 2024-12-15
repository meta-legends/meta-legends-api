import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const HtmlResponse = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const response = ctx.switchToHttp().getResponse();
    response.type('text/html');
    return response;
  },
);
