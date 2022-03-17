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
): T[] {
  return plainToClass(cls, plain, { ...defaultOptionsTransform, ...options });
}

export function recordToEntity<T, V>(
  cls: ClassConstructor<T>,
  plain: V,
  options?: ClassTransformOptions,
): T {
  return plainToClass(cls, plain, { ...defaultOptionsTransform, ...options });
}
