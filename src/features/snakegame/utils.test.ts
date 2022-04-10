import * as utils from "./utils"

// @ponicode
describe("utils.isCoordEqual", () => {
  test("coords match", () => {
    expect(
      utils.isCoordEqual(
        { x: 0, y: 10 }, 
        { x: 0, y: 10 }
      )
    ).toBeTruthy()
    expect(
      utils.isCoordEqual(
        { x: 0, y: 0 }, 
        { x: 0, y: 10 }
      )
    ).toBeFalsy()
  })
})
