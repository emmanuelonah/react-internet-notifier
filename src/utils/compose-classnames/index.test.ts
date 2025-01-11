import { composeClassNames } from './index.util';

describe('composeClassNames', () => {
  it('should return a single class name when one class name is provided', () => {
    expect(composeClassNames('class1')).toBe('class1');
  });

  it('should return multiple class names joined by a space', () => {
    expect(composeClassNames('class1', 'class2', 'class3')).toBe('class1 class2 class3');
  });

  it('should filter out falsy values', () => {
    expect(composeClassNames('class1', '', null, undefined, 'class2')).toBe('class1 class2');
  });

  it('should return an empty string when no class names are provided', () => {
    expect(composeClassNames()).toBe('');
  });

  it('should handle non-string values', () => {
    expect(composeClassNames<number | string | boolean>('class1', 0, false, 'class2')).toBe('class1 class2');
  });
});
