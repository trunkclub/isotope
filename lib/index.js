// @flow

import type {
  OptionT,
  OptionsT,
  ReactT,
} from './types'

const match = regexp => str => regexp.test(str)

const makeProps =
  (kn, vn) =>
    (acc, [key, value]) =>
      ({ ...acc,  [kn(key, value)]: vn(key, value)})

const tupleize = obj => k => [k, obj[k]]

const _isotope = (React: ReactT, option: OptionT) => {

  const { createElement: __createElement } = React

  const createElement = (type, props, ...children) => {

    if (typeof type === 'string' &&
        Object.keys(props || {}).some(match(option.test))) {

      const isotopeProps =
        Object.keys(props)
          .filter(match(option.test))
          .map(tupleize(props))
          .reduce(makeProps(option.key, option.value), {})
      
      return __createElement(
        type,
        { ...props, ...isotopeProps },
        ...children
      )
    }

    return __createElement(type, props, ...children)
  }

  React.createElement = createElement


  return React
}

const isotope =
  (React: ReactT, options: OptionsT) =>
    options.reduce(_isotope, React)

export default isotope
