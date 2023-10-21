import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../components/MainMenu.ts";
import "../components/Chat.ts";
import { classMap } from "lit/directives/class-map.js";

@customElement("home-page")
export class Home extends LitElement {
  /**
   * Toggling of open and close main menu.
   */
  @property({ type: Boolean })
  mainMenuOpened: boolean = false;
  render() {
    const mainClasses = {
      blur: this.mainMenuOpened,
    };
    return html`
      <main-menu
        @main-menu-toggle=${(e: CustomEvent) => {
          this.mainMenuOpened = e.detail.menuOpened;
        }}
      ></main-menu>
      <main class="${classMap(mainClasses)}">
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
    footer {
      text-align: center;
    }
    .blur {
      filter: blur(5px);
      pointer-events: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "home-page": Home;
  }
}
