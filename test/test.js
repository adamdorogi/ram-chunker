const { getCutPoints } = require("../index");
const assert = require("assert");

describe("getCutPoints", () => {
  it("should return [0] when data is empty", () => {
    const data = [];
    const windowSize = 8;

    assert.deepEqual(getCutPoints(data, windowSize), [0]);
  });
  it("should chunk data correctly when last byte is end of chunk, without variable-sized window", () => {
    const data = [
      0x4c, 0x6f, 0x72, 0x65, 0x6d, 0x20, 0x69, 0x70, 0x73, 0x75, 0x6d, 0x20,
      0x64, 0x6f, 0x6c, 0x6f, 0x72, 0x20, 0x73, 0x69, 0x74, 0x20, 0x61, 0x6d,
      0x65, 0x74, 0x2c, 0x20, 0x63, 0x6f, 0x6e, 0x73, 0x65, 0x63, 0x74, 0x65,
      0x74, 0x75, 0x72, 0x20, 0x61, 0x64, 0x69, 0x70, 0x69, 0x73, 0x63, 0x69,
      0x6e, 0x67, 0x20, 0x65, 0x6c, 0x69, 0x74, 0x2e, 0x20, 0x41, 0x65, 0x6e,
      0x65, 0x61, 0x6e, 0x20, 0x61, 0x6c, 0x69, 0x71, 0x75, 0x65, 0x74, 0x20,
      0x73, 0x6f, 0x64, 0x61, 0x6c, 0x65, 0x73, 0x20, 0x6e, 0x69, 0x73, 0x69,
      0x20, 0x69, 0x6e, 0x20, 0x65, 0x75, 0x69, 0x73, 0x6d, 0x6f, 0x64, 0x2e,
      0x20, 0x51, 0x75,
    ];
    const windowSize = 8;

    assert.deepEqual(getCutPoints(data, windowSize), [0, 9, 38, 55, 68, 90]);
  });
  it("should chunk data correctly when last byte is end of chunk, with variable-sized window", () => {
    const data = [
      0x4c, 0x6f, 0x72, 0x65, 0x6d, 0x20, 0x69, 0x70, 0x73, 0x75, 0x6d, 0x20,
      0x64, 0x6f, 0x6c, 0x6f, 0x72, 0x20, 0x73, 0x69, 0x74, 0x20, 0x61, 0x6d,
      0x65, 0x74, 0x2c, 0x20, 0x63, 0x6f, 0x6e, 0x73, 0x65, 0x63, 0x74, 0x65,
      0x74, 0x75, 0x72, 0x20, 0x61, 0x64, 0x69, 0x70, 0x69, 0x73, 0x63, 0x69,
      0x6e, 0x67, 0x20, 0x65, 0x6c, 0x69, 0x74, 0x2e, 0x20, 0x41, 0x65, 0x6e,
      0x65, 0x61, 0x6e, 0x20, 0x61, 0x6c, 0x69, 0x71, 0x75, 0x65, 0x74, 0x20,
      0x73, 0x6f, 0x64, 0x61, 0x6c, 0x65, 0x73, 0x20, 0x6e, 0x69, 0x73, 0x69,
      0x20, 0x69, 0x6e, 0x20, 0x65, 0x75, 0x69, 0x73, 0x6d, 0x6f, 0x64, 0x2e,
      0x20, 0x51, 0x11, 0x75,
    ];
    const windowSize = 8;

    assert.deepEqual(getCutPoints(data, windowSize), [0, 9, 38, 55, 68, 90]);
  });
  it("should chunk data correctly when last byte is not end of chunk, with variable-sized window", () => {
    const data = [
      0x4c, 0x6f, 0x72, 0x65, 0x6d, 0x20, 0x69, 0x70, 0x73, 0x75, 0x6d, 0x20,
      0x64, 0x6f, 0x6c, 0x6f, 0x72, 0x20, 0x73, 0x69, 0x74, 0x20, 0x61, 0x6d,
      0x65, 0x74, 0x2c, 0x20, 0x63, 0x6f, 0x6e, 0x73, 0x65, 0x63, 0x74, 0x65,
      0x74, 0x75, 0x72, 0x20, 0x61, 0x64, 0x69, 0x70, 0x69, 0x73, 0x63, 0x69,
      0x6e, 0x67, 0x20, 0x65, 0x6c, 0x69, 0x74, 0x2e, 0x20, 0x41, 0x65, 0x6e,
      0x65, 0x61, 0x6e, 0x20, 0x61, 0x6c, 0x69, 0x71, 0x75, 0x65, 0x74, 0x20,
      0x73, 0x6f, 0x64, 0x61, 0x6c, 0x65, 0x73, 0x20, 0x6e, 0x69, 0x73, 0x69,
      0x20, 0x69, 0x6e, 0x20, 0x65, 0x75, 0x69, 0x73, 0x6d, 0x6f, 0x64, 0x2e,
      0x20, 0x51, 0x54, 0x68,
    ];
    const windowSize = 8;

    assert.deepEqual(getCutPoints(data, windowSize), [0, 9, 38, 55, 68, 90]);
  });
  it("should chunk data correctly when last byte is not end of chunk, without variable-sized window", () => {
    const data = [
      0x4c, 0x6f, 0x72, 0x65, 0x6d, 0x20, 0x69, 0x70, 0x73, 0x75, 0x6d, 0x20,
      0x64, 0x6f, 0x6c, 0x6f, 0x72, 0x20, 0x73, 0x69, 0x74, 0x20, 0x61, 0x6d,
      0x65, 0x74, 0x2c, 0x20, 0x63, 0x6f, 0x6e, 0x73, 0x65, 0x63, 0x74, 0x65,
      0x74, 0x75, 0x72, 0x20, 0x61, 0x64, 0x69, 0x70, 0x69, 0x73, 0x63, 0x69,
      0x6e, 0x67, 0x20, 0x65, 0x6c, 0x69, 0x74, 0x2e, 0x20, 0x41, 0x65, 0x6e,
      0x65, 0x61, 0x6e, 0x20, 0x61, 0x6c, 0x69, 0x71, 0x75, 0x65, 0x74, 0x20,
      0x73, 0x6f, 0x64, 0x61, 0x6c, 0x65, 0x73, 0x20, 0x6e, 0x69, 0x73, 0x69,
      0x20, 0x69, 0x6e, 0x20, 0x65, 0x75, 0x69, 0x73, 0x6d, 0x6f, 0x64,
    ];
    const windowSize = 8;

    assert.deepEqual(getCutPoints(data, windowSize), [0, 9, 38, 55, 68, 90]);
  });
  it("should chunk data correctly when last byte is not end of chunk, without variable-sized window, and last byte is the only byte in the chunk", () => {
    const data = [
      0x4c, 0x6f, 0x72, 0x65, 0x6d, 0x20, 0x69, 0x70, 0x73, 0x75, 0x6d, 0x20,
      0x64, 0x6f, 0x6c, 0x6f, 0x72, 0x20, 0x73, 0x69, 0x74, 0x20, 0x61, 0x6d,
      0x65, 0x74, 0x2c, 0x20, 0x63, 0x6f, 0x6e, 0x73, 0x65, 0x63, 0x74, 0x65,
      0x74, 0x75, 0x72, 0x20, 0x61, 0x64, 0x69, 0x70, 0x69, 0x73, 0x63, 0x69,
      0x6e, 0x67, 0x20, 0x65, 0x6c, 0x69, 0x74, 0x2e, 0x20, 0x41, 0x65, 0x6e,
      0x65, 0x61, 0x6e, 0x20, 0x61, 0x6c, 0x69, 0x71, 0x75, 0x65, 0x74, 0x20,
      0x73, 0x6f, 0x64, 0x61, 0x6c, 0x65, 0x73, 0x20, 0x6e, 0x69, 0x73, 0x69,
      0x20, 0x69, 0x6e, 0x20, 0x65, 0x75, 0x69,
    ];
    const windowSize = 8;

    assert.deepEqual(getCutPoints(data, windowSize), [0, 9, 38, 55, 68, 90]);
  });
});
