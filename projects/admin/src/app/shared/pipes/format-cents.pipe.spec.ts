import { FormatCentsPipe } from './format-cents.pipe';

describe('FormatCentsPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatCentsPipe();
    expect(pipe).toBeTruthy();
  });
  it('should to format cents', () => {
    const pipe = new FormatCentsPipe();
    expect(pipe.transform(1000)).toBe(10);
  });
  it('should to format cents with decimal', () => {
    const pipe = new FormatCentsPipe();
    expect(pipe.transform(1555)).toBe(15.5);
  });
});
