const { palidrome } = require('../utils/for_testing')
const {average} = require('../utils/for_testing')

test("palidrome", () => {
    const result = palidrome("hello")
    expect(result).toBe("olleh")
})

test("average", () => {
    const result = average([1, 2, 3])
    expect(result).toBe(2)
})

