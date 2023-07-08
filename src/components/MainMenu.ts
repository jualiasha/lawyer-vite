import { LitElement, css, html, PropertyValues, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { when } from "lit/directives/when.js";

@customElement("main-menu")
export class MainMenu extends LitElement {
  /**
   * Toggling of open and close menu states.
   */
  @property({ type: Boolean })
  menuOpened: boolean = false;
  /**
   * Toggling of open and close companies' menu.
   */
  @property({ type: Boolean })
  companiesMenuVisible: boolean = false;

  @state()
  private _home: HTMLElement | null = null;
  private _companies: HTMLElement | null = null;
  private _individuals: HTMLElement | null = null;
  private _reviews: HTMLElement | null = null;
  private _contacts: HTMLElement | null = null;
  private _header: HTMLElement | null = null;

  render() {
    const classes = {
      "menu-visible": this.menuOpened,
      "menu-hidden": !this.menuOpened,
    };
    return html`
      <header class="${classMap(classes)}">
        <nav>
          <ul class="title-list">
            <li id="home">
              <a href="/index.html">Home</a>
            </li>
            <li id="companies">Companies</li>
            <li id="individuals">Individuals</li>
            <li id="reviews">Reviews</li>
            <li id="contacts">Contacts</li>
          </ul>
          ${when(
            this.companiesMenuVisible,
            () => html`
              <ul class="menu-list">
                <li><a href="/service.html">Company Service 1</a></li>
                <li><a href="/service.html">Company Service 2</a></li>
                <li><a href="/service.html">Company Service 3</a></li>
              </ul>
            `,
            () => nothing
          )}
          <div id="individuals-menu"></div>
          <div id="reviews-menu"></div>
          <div id="contacts-menu"></div>
        </nav>
      </header>
    `;
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    console.log(_changedProperties);
    this._home = this.renderRoot.querySelector("#home");
    this._companies = this.renderRoot.querySelector("#companies");
    this._individuals = this.renderRoot.querySelector("#individuals");
    this._reviews = this.renderRoot.querySelector("#reviews");
    this._contacts = this.renderRoot.querySelector("#contacts");
    this._header = this.renderRoot.querySelector("header");
    this._home?.addEventListener(
      "mouseover",
      this._handleMenuHover.bind(this, "home")
    );
    this._companies?.addEventListener(
      "mouseover",
      this._handleMenuHover.bind(this, "companies")
    );
    this._individuals?.addEventListener(
      "mouseover",
      this._handleMenuHover.bind(this, "individuals")
    );
    this._reviews?.addEventListener(
      "mouseover",
      this._handleMenuHover.bind(this, "reviews")
    );
    this._contacts?.addEventListener(
      "mouseover",
      this._handleMenuHover.bind(this, "contacts")
    );
    this._header?.addEventListener(
      "mouseleave",
      this._handleMenuLeave.bind(this)
    );
  }

  private _handleMenuLeave() {
    this.menuOpened = false;
    this.companiesMenuVisible = false;
    console.log("close menu");
  }

  private _handleMenuHover(key: string) {
    this.menuOpened = true;
    switch (key) {
      case "companies":
        this.companiesMenuVisible = true;
        break;
      case "individuals":
        console.log("this is individuals");
        break;
      case "reviews":
        console.log("this is reviews");
        break;
      case "contacts":
        console.log("this is contacts");
        break;
      default:
        console.log("this is home");
    }
  }

  disconnectedCallback() {
    this._home?.removeEventListener(
      "mouseover",
      this._handleMenuHover.bind(this, "home")
    );
    this._companies?.removeEventListener(
      "mouseover",
      this._handleMenuHover.bind(this, "companies")
    );
    this._individuals?.removeEventListener(
      "mouseover",
      this._handleMenuHover.bind(this, "individuals")
    );
    this._reviews?.removeEventListener(
      "mouseover",
      this._handleMenuHover.bind(this, "reviews")
    );
    this._contacts?.removeEventListener(
      "mouseover",
      this._handleMenuHover.bind(this, "contacts")
    );
    this._header?.removeEventListener(
      "mouseleave",
      this._handleMenuLeave.bind(this)
    );
    super.disconnectedCallback();
  }

  updated() {
    debugger;
  }

  static styles = css`
    .title-list {
      display: flex;
      justify-content: center;
    }
    .title-list li {
      display: inline;
      margin: 0 2rem;
      font-size: 1.1rem;
    }
    a {
      text-decoration: none;
    }

    @keyframes backgroundMoveForward {
      0% {
        height: 1rem;
      }
      25% {
        height: 3rem;
      }
      50% {
        height: 5rem;
      }
      75% {
        height: 6rem;
      }
      100% {
        height: 7rem;
      }
    }
    @keyframes backgroundMoveBackward {
      0% {
        height: 7rem;
      }
      25% {
        height: 6rem;
      }
      50% {
        height: 5rem;
      }
      75% {
        height: 3rem;
      }
      100% {
        height: 1rem;
      }
    }
    @keyframes menuListAppearance {
      0% {
        color: transparent;
      }
      50% {
        color: transparent;
      }
      75% {
        color: var(--lawyer-dark-blue);
      }
      100% {
        color: var(--lawyer-dark-blue);
      }
    }
    .menu-list {
      list-style: none;
      margin-top: 2rem;
    }
    .menu-list li {
      font-size: 1.5rem;
      animation: menuListAppearance 1s ease-in 0s;
      color: var(--lawyer-dark-blue);
    }
    .menu-visible {
      position: absolute;
      top: 0;
      width: 100%;
      background-color: #fff;
      animation: backgroundMoveForward 70ms ease-in 0s;
    }
    .menu-hidden {
      position: absolute;
      top: 0;
      width: 100%;
      background-color: transparent;
      animation: backgroundMoveBackward 70ms ease-out 0s;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "main-menu": MainMenu;
  }
}
