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
  key: (name: string, value: any) => string,
  value: (name: string, value: any) => string
}

export type OptionsT = Array<OptionT>
