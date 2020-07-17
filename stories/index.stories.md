```js script
import { html } from '@open-wc/demoing-storybook';
import '../custom-tag.js';

export default {
  title: 'CustomTag',
  component: 'custom-tag',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# CustomTag

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add custom-tag
```

```js
import 'custom-tag/custom-tag.js';
```

```js preview-story
export const Simple = () => html`
  <custom-tag></custom-tag>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <custom-tag title="Hello World"></custom-tag>
`;
```
