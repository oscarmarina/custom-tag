/* eslint-disable no-unused-expressions */
//import { LitElement, html as litHtml } from 'lit-element';
import { LitElement, html } from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import { unsafeStatic, withUnsafeStatic } from './unsafe-static.js';
import takeCareOf from 'carehtml';
import PlainButton from 'elixOld/src/plain/PlainButton.js';
import 'elix/define/Button.js';
import styles from './CustomTag-styles.js';

customElements.define('elix-button-01', PlainButton);
const tag = withUnsafeStatic(html);



//const html = takeCareOf(litHtml);
/**
This component ...

Example:

```html
<custom-tag></custom-tag>
```

##styling-doc

@customElement custom-tag
@polymer
@LitElement
@demo demo/index.html
*/
export class CustomTag extends LitElement {

  static get is() {
    return 'custom-tag';
  }

  static get properties() {
    return {
      value: {
        type: Number,
      },

      customTag: {
        type: String,
        attribute: 'custom-tag'
      }
    };
  }

  constructor() {
    super();
    this.value = 0;
    this.customTag = 'button';
  }

  firstUpdated(changedProps) {
    super.firstUpdated && super.firstUpdated(changedProps);
    const buttonUp = this.shadowRoot.querySelector('#buttonUp');
    const buttonDown = this.shadowRoot.querySelector('#buttonDown');
    buttonUp.addEventListener('mousedown', (e) => {
      this.value++; typeof e.detail === 'object' ? e.detail.provider = this : '';
    });
    buttonDown.addEventListener('mousedown', (e) => {
      this.value--; typeof e.detail === 'object' ? e.detail.provider = this : '';
    });
  }

  updated(changedProperties) {
    super.updated && super.updated(changedProperties);
  }

  get customTag() {
    return this._tag;
  }

  set customTag(newVal) {
    const oldVal = this._tag;
    if (newVal !== oldVal) {
      this._tag = unsafeStatic(newVal);
      //this._tag = unsafeHTML(newVal);
    }
    this.requestUpdate('customTag', oldVal);
  }
  static get styles() {
    return [
      styles
    ];
  }

  render() {
    return html`
      <span>${this.value}</span>
      ${tag`<${this.customTag} id="buttonUp" title="${this.value}">▲</${this.customTag}>`}
      ${tag`<${this.customTag} id="buttonDown">▼</${this.customTag}>`}
    `;
  }
}

// Key for storing interval raised while button is held down.
const repeatIntervalKey = Symbol();
class RepeatButton extends HTMLElement {
  static get is() {
    return 'repeat-button';
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.template;

    const button = this.shadowRoot.querySelector('button');

    button.addEventListener('mousedown', (e) => {
      this.repeatStart(e);
    });
    button.addEventListener('mouseup', () => {
      this.repeatStop();
    });
    button.addEventListener('mouseleave', () => {
      this.repeatStop();
    });

    // Treat touch events like mouse events.
    button.addEventListener('touchstart', (e) => {
      this.repeatStart(e);
    });
    button.addEventListener('touchend', () => {
      this.repeatStop();
    });
  }

  get template() {
    return `
      <button><slot></slot></button>
    `;
  }

  repeatStart(event) {
    event.preventDefault();
    event.stopPropagation();
    this.raiseMousedown(event);
    this[repeatIntervalKey] = setInterval(() => {
      this.raiseMousedown(event);
    }, 260);
  }

  repeatStop(event) {
    // Stop interval in progress.
    clearInterval(this[repeatIntervalKey]);
    this[repeatIntervalKey] = null;
  }

  raiseMousedown(e) {
    const event = new CustomEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      detail: {}
    });
    this.dispatchEvent(event);
    console.log(event.detail);
  }
}
customElements.define(RepeatButton.is, RepeatButton);
