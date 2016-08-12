// @flow

import type {
  OptionFunctionT,
  OptionT,
  StrictOptionT,
} from './types'

export const match =
  (regexp: RegExp) => (str: string): boolean =>
    regexp.test(str)

export const wrapFunction =
  (fn: string|OptionFunctionT): OptionFunctionT =>
    typeof fn === 'string'
      ? () => fn.toString()
      : fn

export const wrapTest =
  (test: string|RegExp): RegExp =>
    typeof test === 'string'
      ? new RegExp(`^${test}\$`)
      : test

export const normalizeOptions =
  ({ test, value, attribute, blacklist }: OptionT): StrictOptionT =>
    ({
      test: wrapTest(test),
      value: wrapFunction(value),
      attribute: wrapFunction(attribute),
      blacklist: blacklist ? blacklist.map(wrapTest) : [],
    })

export const makeProps =
  (
    kn: OptionFunctionT,
    vn: OptionFunctionT,
    cN: ?string,
    c: ?React$Component<any, any, any>
  ) =>
    (acc: Object, [key, value]: [string, any]) =>
      ({ ...acc,  [kn(key, value, cN, c)]: vn(key, value, cN, c)})

export const tupleize = (obj: Object) =>
  (k: string): [ string, any ] =>
    [k, obj[k]]
