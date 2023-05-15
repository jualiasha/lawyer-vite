import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('chat-helper')
export class Chat extends LitElement {

    render() {
        return html`
      <div class="chat">
          Hello, this is chat
      </div>
     
    `
    }


    static styles = css`
    .chat{
      background-color: aquamarine;
      width: 100px;
      height: 100px;
    }
  `
}

declare global {
    interface HTMLElementTagNameMap {
        'chat-helper': Chat
    }
}
