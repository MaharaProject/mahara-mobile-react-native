// import React from "react";
// import { create } from "react-test-renderer";
// import { GetProfile } from './GetProfile.tsx';
//
// describe("GetProfile component", () => {
//   test("Matches the snapshot", () => {
//     const getProfile = create(<GetProfile />);
//     expect(getProfile.toJSON()).toMatchSnapshot();
//   });
// });

// Add 'export' to fake this being a module to silence TSLint.
export const add = (a: number, b: number) => a + b;
describe("add", () => {
  it("should add two numbers", () => {
    expect(add(1, 1)).toEqual(2);
  });
});
