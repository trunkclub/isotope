// @flow

export type ReactT = {
  createElement:
    (
      type: string|React$Component<any, any, any>,
      props: Object,
      ...children: Array<React$Element<any>>
    ) =>
      React$Element<any>
}

export type OptionT = {
  test: RegExp|string,
  blacklist?: Array<string|RegExp>,
  attribute: string|OptionFunctionT,
  value: string|OptionFunctionT,
}

export type StrictOptionT = {
  test: RegExp,
  blacklist: Array<RegExp>,
  attribute: OptionFunctionT,
  value: OptionFunctionT,
}

export type OptionsT = Array<OptionT>

export type OptionFunctionT =
  (name?: string, value?: string, component?: ?string) => string
