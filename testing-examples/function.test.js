const forEach = require('./function')

// NO ME INTERESA PROBAR LA FUNCION CALLBACK SOLO ME INTERSA
// EL FOREACH, POR ELLO LO SUPLANTAMOS (MOCKEAR)

const mockCallback = jest.fn(x => x + 1)

test("Testing callback", () => {
    const list = [4, 5, 6, 7]
    forEach(list, mockCallback)
    expect(mockCallback.mock.calls.length).toBe(list.length)
    // expect(mockCallback.mock.calls[[0][0]]).toBe(list[0])
    // expect(mockCallback.mock.results[2].value).toBe(list[2] + 2)
})
