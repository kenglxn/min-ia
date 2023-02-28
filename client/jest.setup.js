// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

import { server } from "./__mocks__/server";

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// Polyfill for fetch
import "whatwg-fetch";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
