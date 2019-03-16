# VFG Display Fields

VFG Display Fields is a [Vue.js](https://github.com/vuejs/vue) component for displaying the fields of an object - using a [vue-form-generator (vfg)](https://github.com/vue-generators/vue-form-generator) schema if provided.

![Example screenshot](doc/fd-example01.jpg)

## Demo

[CodeSandBox example](https://codesandbox.io/embed/ykpj1jpxvv?fontsize=14&view=preview)

## Features

- (with a schema) display of core and optional vfg field types in an appropriate way
- (without a schema) display of all simple fields as strings
- customizable styles
- options include whether to show null values, and hiding particular fields

## Current exclusions

- VFG custom fields, including [Public Custom Fields](https://github.com/vue-generators/vue-form-generator#public-custom-fields)

## Reason for Being

I have a mapping application ([Mapping for One-Place Studies - M4OPS](https://bit.ly/m4ops)) that stores information about features, and needs to display them on hover or click. In my new version of this I am using vfg schemas to define the structure of this information, and allowing users to define it. VFG Display Fields can display everything entered.

## Documentation

[Component](doc/component.md)

## Dependencies

- vue-form-generator
- fecha
- tinycolor2
- lodash

## Installation

```bash
npm install vfg-display-fields
```

## Usage

```html
<display-fields
  :schema="schema"
  :obj="model"
  :options="options"
/>
```

### ES6

```js
//
// You can register a component manually
//
import { DisplayFields } from 'vfg-display-fields';

export default {
  ...
  components: {
    'display-fields': DisplayFields
  },
  ...
};
```

## License

vfg-display-fields is available under the [MIT license](https://tldrlegal.com/license/mit-license).

[Development](/ReadMeDev.md)

## Contact

Copyright \(C\) 2019 PeterC66

[![@PeterC66](https://img.shields.io/badge/github-PeterC66-green.svg)](https://github.com/PeterC66)
