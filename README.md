# isotope

Add html attributes based on props passed to an element

# Example

## Your app...
```js
import React from 'react'
import ReactDOM from 'react-dom'

// Hook everything up
isotope(React, [{
  test: /^onClick$/,
  key: () => 'data-hasclickhandler',
  value: () => true
}])

ReactDOM.render(<button onClick={() => alert('Hello!')}>Click Me!</button>, ...); 
```

## Rendered output

```html
<button data-hasclickhander="true">Click Me!</button>
```
