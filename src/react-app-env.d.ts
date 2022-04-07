/// <reference types="react-scripts" />

// allow markdown import
declare module '*.md'

declare module "fsjsd-demosite"

// see:
// https://stackoverflow.com/questions/61667608/how-do-you-correctly-use-react-lazy-in-typescript-to-import-a-react-component
declare namespace React {
  function lazy<T extends ComponentType<any>>(
    factory: () => Promise<{ default: T }>,
  ): T;
}