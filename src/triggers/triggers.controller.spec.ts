import { Test, TestingModule } from '@nestjs/testing';
import { TriggerController } from './triggers.controller';

describe('UsersController', () => {
  let controller: TriggerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TriggerController],
    }).compile();

    controller = module.get<TriggerController>(TriggerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
