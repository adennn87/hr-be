import { Test, TestingModule } from '@nestjs/testing';
import { FunctionGateway } from './function.gateway';
import { FunctionService } from './function.service';

describe('FunctionGateway', () => {
  let gateway: FunctionGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FunctionGateway, FunctionService],
    }).compile();

    gateway = module.get<FunctionGateway>(FunctionGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
