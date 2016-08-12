import isotope from '../lib/isotope'

describe('isotope', () => {
  it('wraps React.createElement', () => {
    const React = jasmine.createSpyObj('React', ['createElement'])
    const originalCreateElement = React.createElement
    const options = [{
      test: /onClick/,
      attribute: () => 'data-has-onclick',
      value: () => true,
      blacklist: []
    }]

    isotope(React, options)

    React.createElement('div', { onClick: () => null })

    expect(originalCreateElement).toHaveBeenCalled()
  })

  it('adds properties to calls to React.createElement', () => {
    const React = jasmine.createSpyObj('React', ['createElement'])
    const originalCreateElement = React.createElement
    const options = [{
      test: /onClick/,
      attribute: () => 'data-has-onclick',
      value: () => true,
      blacklist: []
    }]
    const onClick = () => null

    isotope(React, options)

    React.createElement('button', { type: 'button', onClick })

    expect(originalCreateElement.calls.mostRecent().args).toEqual([
      'button',
      {
        'data-has-onclick': true,
        type: 'button',
        onClick,
      }
    ])
  })
})
