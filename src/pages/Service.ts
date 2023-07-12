import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '../components/MainMenu.ts'
import litLogo from '../assets/lit.svg'

@customElement('service-page')
export class Service extends LitElement {

    render() {
        return html`
      <header>

      </header>
      <main>
          <h1>Service title</h1>
          <div class="description">
              <div class="short-description">
              <img src=${litLogo} class="logo lit" alt="Lit logo" />
              <div class="short-description-text">Short description of the service comes here</div>
              </div>
              <div class="main-text">Main text of the service Welcome</div>
          </div>
      </main>
      <footer>Copywrite 2023</footer>
    `
    }


    static styles = css`
    .short-description{
      display: flex;
      justify-content: space-around;
    }
      .main-text{
        padding: 2rem;
      }
  `
}

declare global {
    interface HTMLElementTagNameMap {
        'service-page': Service
    }
}
