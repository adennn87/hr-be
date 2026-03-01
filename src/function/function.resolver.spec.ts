import { Test, TestingModule } from '@nestjs/testing';
import { FunctionResolver } from './function.resolver';
import { FunctionService } from './function.service';

describe('FunctionResolver', () => {
  let resolver: FunctionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FunctionResolver, FunctionService],
    }).compile();

    resolver = module.get<FunctionResolver>(FunctionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
