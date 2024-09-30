import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UsersService } from "src/modules/users/users.service";

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user || null;
  }
);

