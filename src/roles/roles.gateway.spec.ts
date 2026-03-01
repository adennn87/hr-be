import { Test, TestingModule } from '@nestjs/testing';
import { RolesGateway } from './roles.gateway';
import { RolesService } from './roles.service';

describe('RolesGateway', () => {
  let gateway: RolesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesGateway, RolesService],
    }).compile();

    gateway = module.get<RolesGateway>(RolesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
