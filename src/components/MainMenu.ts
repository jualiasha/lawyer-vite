import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('main-menu')
export class MainMenu extends LitElement {

    render() {
        return html`
      <nav >
          <ul>
              <li>
                  Home
              </li>
              <li>
                  Juriki
              </li><li>
                  Fiziki
              </li>
          </ul>
      </nav>
    `
    }

    static styles = css`
    nav{
      background-color: aliceblue;
    }
      ul{
        display: inline-block;
      }
      li{
        display: inline;
        margin: 0 1rem;
        font-size: 30px;
      }
  `
}

declare global {
    interface HTMLElementTagNameMap {
        'main-menu': MainMenu
    }
}
