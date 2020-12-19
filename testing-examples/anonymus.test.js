test("Testing anonymus function", () => {
    jest.mock('./anonymus.js')
    const age = require('./anonymus')

    age.mockImplementationOnce(() => 100)
    age.mockImplementationOnce(() => 200)
    age.mockImplementation(() => 10)
    age.mockImplementation(() => 10000)


    expect(age()).toBe(100)
    expect(age()).toBe(200)
    expect(age()).toBe(10000)
    expect(age()).toBe(10000)
})
