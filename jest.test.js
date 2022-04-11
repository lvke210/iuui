test("commen matcher", () => {
  expect(2 + 2).toBe(4);
  expect(2 + 2).not.toBe(5);
}, 1000);

test("tobe true or false", () => {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
});

test("number", () => {
  expect(4).toBeGreaterThan(2);
  expect(2).toBeLessThan(3);
});

test("obj", () => {
  expect({ name: "owen" }).toEqual({ name: "owen" });
});
