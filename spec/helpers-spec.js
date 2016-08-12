import {
  makeProps,
  match,
  normalizeOptions,
  tupleize,
  wrapFunction,
  wrapTest,
} from '../lib/helpers'

describe('helpers', () => {
  describe('match', () => {

    it('returns a function', () => {
      const regexp = /FooBar/

      const ret = match(regexp)

      expect(typeof ret).toBe('function')
    })

    it('returns a function that tests the regexp against a passed in string', () => {
      const regexp = /FooBar/

      const test = match(regexp)

      expect(test('FooBar')).toBe(true)
      expect(test('FooBaz')).toBe(false)
    })

  })

  describe('wrapFunction', () => {

    it('is an identity function when passed a function', () => {
      const fn = () => 'something'

      const ret = wrapFunction(fn)

      expect(ret).toBe(fn)
    })

    it('returns a function that returns the passed string when passed a string', () => {
      const str = 'Hello, World'

      const ret = wrapFunction(str)

      expect(ret()).toEqual(str)
    })
    
  })

  describe('wrapTest', () => {

    it('creates a regexp when passed a string', () => {
      const str = 'FooBar'

      const ret = wrapTest(str)


      expect(ret instanceof RegExp).toBe(true)
    })

    it('creates RegExp that strictly match when passed a string', () => {
      const str = 'FooBar'

      const ret = wrapTest(str)

      expect(ret.test('FooBar')).toBe(true)
      expect(ret.test('FooBar and something else')).toBe(false)
    })

  })

  describe('tupleize', () => {
    it('returns a function when passed an object', () => {
      const obj = {
        foo: 'bar',
        baz: 3,
      }

      const ret = tupleize(obj)

      expect(typeof ret).toBe('function')
    })

    it('returns a fucntion that returns key value pairs when passed a key', () => {
      const obj = {
        foo: 'bar',
        baz: 3
      }

      const ret = tupleize(obj)

      expect(ret('foo')).toEqual(['foo', 'bar'])
      expect(ret('baz')).toEqual(['baz', 3])
    })
  })

  describe('normalizeOptions', () => {
    const options = {
      test: 'test',
      attribute: 'test',
      value: 'test',
      blacklist: [ 'test' ],
    }

    it('makes string `test` properties strict RegExp', () => {
      const { test } = normalizeOptions(options)

      expect(test instanceof RegExp).toBe(true)
      expect(test.test('test')).toBe(true)
      expect(test.test('other test')).toBe(false)
    })

    it('makes string `attribute` properties functions that return that string', () => {
      const { attribute } = normalizeOptions(options)

      expect(typeof attribute).toBe('function')
      expect(attribute()).toEqual(options.attribute)
    })

    it('makes string `value` properties functions that return that string', () => {
      const { value } = normalizeOptions(options)

      expect(typeof value).toBe('function')
      expect(value()).toEqual(options.value)
    })

    it('makes string values in the `blacklist` array strict RegExps', () => {
      const { blacklist } = normalizeOptions(options)

      expect(blacklist[0] instanceof RegExp).toBe(true)
      expect(blacklist[0].test('test')).toBe(true)
      expect(blacklist[0].test('other test')).toBe(false)
    })

    it('makes blacklist an empty array if there is no blacklist property', () => {
      const options = {
        test: 'test',
        attribute: 'test',
        value: 'test'
      }

      const { blacklist } = normalizeOptions(options)

      expect(blacklist).toEqual([])
    })
  })

  describe('makeProps', () => {
    it('returns a function', () => {
      const ret = makeProps()

      expect(typeof ret).toBe('function')
    })

    it('calls the key and value functions to set properties on the passed object', () => {
      const props = {
        foo: 'bar'
      }

      const kn = jasmine.createSpy('kn'),
            vn = jasmine.createSpy('vn')

      makeProps(kn, vn)(props, ['baz', 3])


      expect(kn).toHaveBeenCalled()
      expect(vn).toHaveBeenCalled()

      expect(kn.calls.mostRecent().args).toEqual([
        'baz', 3,
        undefined, undefined
      ])
      expect(vn.calls.mostRecent().args).toEqual([
        'baz', 3,
        undefined, undefined
      ])
    })
  })
})

