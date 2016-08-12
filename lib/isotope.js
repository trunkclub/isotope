// @flow
import getDisplayName from 'react-display-name'

import type {
  OptionsT,
  ReactT,
  StrictOptionT,
} from './types'

import {
  makeProps,
  match,
  normalizeOptions,
  tupleize,
  wrapFunction,
  wrapTest,
} from './helpers'

const _isotope = (React: ReactT, option: StrictOptionT) => {

  const { createElement: _createElement } = React

  let component = null,
      componentName = null

  const createElement = (type, props, ...children) => {

    if (typeof type === 'string') {

      if (Object.keys(props || {}).some(match(option.test))) {

        return _createElement(
          type,
          {
            ...props,
            ...Object.keys(props)
              .filter(match(option.test))
              .map(tupleize(props))
              .reduce(makeProps(option.attribute, option.value, componentName, component), {})
          },
          ...children
        )
      }

    } else {

      const { blacklist } = option

      if (type && !blacklist.some(b =>  b.test(getDisplayName(type)))) {

        component = type
        componentName = getDisplayName(type)

      }

    }

    return _createElement(type, props, ...children)

  }

  React.createElement = createElement

  return React

}

const isotope =
  (React: ReactT, options: OptionsT) =>
    options
      .map(normalizeOptions)
      .reduce(_isotope, React)

export default isotope
