import { SetMetadata } from '@nestjs/common';

export const REQUIRE_FUNCTION_KEY = 'require_function';

export const RequireFunction = (functionName: string) =>
  SetMetadata(REQUIRE_FUNCTION_KEY, functionName);