// Putting this in it's own file so it can be mocked

export function isNativeLazyLoadSupported() {
  return 'loading' in HTMLImageElement.prototype;
}