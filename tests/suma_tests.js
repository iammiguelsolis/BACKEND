const suma = (a, b) => {
    return a - b
}

const checks = [
    {a: 0, b: 0, expected: 0},
    {a: 1, b: 2, expected: 3},
    {a: 2, b: 2, expected: 4}
]

checks.forEach(({a, b, expected}) => {
    const result = suma(a, b)
    if (result === expected) {
        console.log(`✅ ${a} + ${b} = ${result}`)
    } else {
        console.log(`❌ ${a} + ${b} = ${result} (expected: ${expected})`)
    }
})