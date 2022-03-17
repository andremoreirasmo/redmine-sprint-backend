import {
  ClassConstructor,
  ClassTransformOptions,
  plainToClass,
} from 'class-transformer';

const defaultOptionsTransform = {
  ignoreDecorators: true,
};

export function recordToEntity<T, V>(
  cls: ClassConstructor<T>,
  plain: V[],
  options?: ClassTransformOptions,
): T[];
export function recordToEntity<T, V>(
  cls: ClassConstructor<T>,
  plain: V,
  options?: ClassTransformOptions,
): T;
export function recordToEntity<T, V>(
  cls: ClassConstructor<T>,
  plain: V | V[],
  options?: ClassTransformOptions,
): T | T[] {
  return plainToClass(cls, plain as unknown, {
    ...options,
    ...defaultOptionsTransform,
  });
}
