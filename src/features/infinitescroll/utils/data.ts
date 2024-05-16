const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export type FeedItem = {
  name: string;
  url: string;
  description: string;
};

export const getItem = (index: number): FeedItem => {
  return {
    name: `Random Name - ${index}`,
    description: `
    Random Description ${index} - Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`.slice(
      getRandom(100, 200)
    ),
    url: `https://picsum.photos/id/${index}/250/250`
  };
};
