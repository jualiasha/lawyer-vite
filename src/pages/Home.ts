import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "../components/MainMenu.ts";
import "../components/Chat.ts";

@customElement("home-page")
export class Home extends LitElement {
  render() {
    return html`
      <main-menu></main-menu>
      <main>
        <chat-helper></chat-helper>
      </main>
      <footer>Copywrite 2023</footer>
    `;
  }

  static styles = css`
    main,
    footer {
      padding: 1rem;
    }
    main {
      margin-top: 3rem;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "home-page": Home;
  }
}
