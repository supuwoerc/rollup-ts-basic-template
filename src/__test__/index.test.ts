import { addNumber } from '@/index'

describe('demo test', () => {
    test('add two number', () => {
        expect(addNumber(1, 2)).toBe(3)
    })
})
