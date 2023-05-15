import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '../components/MainMenu.ts'
import '../components/Chat.ts'

@customElement('home-page')
export class Home extends LitElement {

    render() {
        return html`
      <header>
          <main-menu></main-menu>
      </header>
      <main>
          <h1>Super awesome welcome chat</h1>
          <chat-helper></chat-helper>
      </main>
      <footer>Copywrite 2023</footer>
    `
    }


    static styles = css`
    header, main, footer{
      padding: 1rem;
    }
  `
}

declare global {
    interface HTMLElementTagNameMap {
        'home-page': Home
    }
}
