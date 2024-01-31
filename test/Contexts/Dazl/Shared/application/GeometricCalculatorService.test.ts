import { Test, TestingModule } from '@nestjs/testing';
import { GeometricCalculatorService } from '../../../../../src/Contexts/Dazl/Shared/application/calculator-if-within-radius/geometric-calculator.service';

describe('GeometricCalculatorService', () => {
  let service: GeometricCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeometricCalculatorService],
    }).compile();

    service = module.get<GeometricCalculatorService>(
      GeometricCalculatorService,
    );
  });

  it('should be defined', () => {
    // dentro del radio
    const insideRadio = service.isInsideRadio(
      -17.772422874491486,
      -63.19572613033507,
      -17.77245352494095,
      -63.19537744316072,
      100,
    );

    expect(service).toBeDefined();
    expect(insideRadio).toBe(true);
  });

  it('should be defined', () => {
    //fuera del radio
    const insideRadio = service.isInsideRadio(
      -17.772422874491486,
      -63.19572613033507,
      -17.77268595734502,
      -63.193448934865664,
      100,
    );

    expect(service).toBeDefined();
    expect(insideRadio).toBe(false);
  });
});
