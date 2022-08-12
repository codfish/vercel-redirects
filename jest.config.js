import jestConfig from 'cod-scripts/jest.js';

export default Object.assign(jestConfig, {
  // make esmodules work
  moduleNameMapper: {
    '#(.*)': '<rootDir>/node_modules/$1',
  },
  transform: {},
});
