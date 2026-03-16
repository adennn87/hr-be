export class CreateAdjustmentTypeDto {
  name: string;
  type: 'ADD' | 'DEDUCT';
  description?: string;
}