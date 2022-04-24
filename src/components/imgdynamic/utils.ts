// Putting this in it's own file so it can be mocked
export const isNativeLazyLoadSupported = () => 'loading' in HTMLImageElement.prototype;