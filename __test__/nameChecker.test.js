import { checkForName } from "../src/client/js/nameChecker";

describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit() function", () => {
    expect(checkForName("Picard")).toBeDefined();
  });
});

describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit() function", () => {
    expect(checkForName("Picard")).toBe("Welcome");
  });
});
