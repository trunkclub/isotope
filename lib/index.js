// @flow

import getDisplayName from 'react-display-name'
import type {
  OptionT,
  OptionsT,
  ReactT,
} from './types'

const match = regexp => str => regexp.test(str)

const makeProps =
  (kn, vn, c) =>
    (acc, [key, value]) =>
      ({ ...acc,  [kn(key, value, c)]: vn(key, value, c)})

const tupleize = obj => k => [k, obj[k]]


const _isotope = (React: ReactT, option: OptionT) => {

  const { createElement: _createElement } = React

  let component = null

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
              .reduce(makeProps(option.attribute, option.value, component), {})
          },
          ...children
        )
      }

    } else {

      const { blacklist } = option

      if (!blacklist
      || (type && !blacklist.includes(getDisplayName(type)))) {

        component = getDisplayName(type)

      }

    }

    return _createElement(type, props, ...children)

  }

  React.createElement = createElement

  return React

}


const isotope =
  (React: ReactT, options: OptionsT) =>
    options.reduce(_isotope, React)

export default isotope
