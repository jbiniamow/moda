import { ClothingTypePipe } from '../pipes/clothing-type.pipe';

describe('ClothingTypePipe', () => {
  it('create an instance', () => {
    const pipe = new ClothingTypePipe();
    expect(pipe).toBeTruthy();
  });
});
