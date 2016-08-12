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
  test: RegExp,
  blacklist?: Array<string>,
  attribute: (name: string, value: any) => string,
  value: (name: string, value: any) => string
}

export type OptionsT = Array<OptionT>
