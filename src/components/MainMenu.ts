import { LitElement, css, html, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { when } from "lit/directives/when.js";

@customElement("main-menu")
export class MainMenu extends LitElement {
  /**
   * Toggling of open and close companies' menu.
   */
  @property({ type: Boolean })
  companiesMenuVisible: boolean = false;

  /**
   * Toggling of open and close individuals' menu.
   */
  @property({ type: Boolean })
  individualsMenuVisible: boolean = false;

  /**
   * Toggling of open and close reviews' menu.
   */
  @property({ type: Boolean })
  reviewsMenuVisible: boolean = false;

  /**
   * Toggling of open and close contacts' menu.
   */
  @property({ type: Boolean })
  contactsMenuVisible: boolean = false;

  @state()
  public menuOpened: boolean = false;
  private _home: HTMLElement | null = null;
  private _companies: HTMLElement | null = null;
  private _individuals: HTMLElement | null = null;
  private _reviews: HTMLElement | null = null;
  private _contacts: HTMLElement | null = null;
  private _header: HTMLElement | null = null;
  private _currentLocation: string = "";

  connectedCallback() {
    super.connectedCallback();
    this._currentLocation = window.location.pathname;
  }

  private _checkCurrentLocation(key: string) {
    switch (key) {
      case "index":
        return this._currentLocation.includes("index");
      case "companies":
        return this._currentLocation.includes("companies");
      case "individuals":
        return this._currentLocation.includes("individuals");
      case "reviews":
        return this._currentLocation.includes("reviews");
      default:
        return this._currentLocation.includes("contacts");
    }
  }

  render() {
    const openMenuClasses = {
      "menu-visible": this.menuOpened,
      "menu-hidden": !this.menuOpened,
    };
    const homeLocation = {
      "current-link": this._checkCurrentLocation("index"),
    };
    const companiesLocation = {
      "current-link": this._checkCurrentLocation("companies"),
    };
    const individualsLocation = {
      "current-link": this._checkCurrentLocation("individuals"),
    };
    const reviewsLocation = {
      "current-link": this._checkCurrentLocation("reviews"),
    };
    const contactsLocation = {
      "current-link": this._checkCurrentLocation("contacts"),
    };
    return html`
      <header class="${classMap(openMenuClasses)}">
        <nav>
          <ul class="title-list">
            <li id="home">
              <a class="${classMap(homeLocation)}" href="/index.html">Home</a>
            </li>
            <li id="companies" class="${classMap(companiesLocation)}">
              Companies
            </li>
            <li id="individuals" class="${classMap(individualsLocation)}">
              Individuals
            </li>
            <li id="reviews" class="${classMap(reviewsLocation)}">Reviews</li>
            <li id="contacts" class="${classMap(contactsLocation)}">
              Contacts
            </li>
          </ul>
          ${when(
            this.companiesMenuVisible ||
              this.individualsMenuVisible ||
              this.contactsMenuVisible ||
              this.reviewsMenuVisible,
            () => this._handleMenuVisible()
          )}
        </nav>
      </header>
    `;
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
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

  private _handleMenuVisible() {
    switch (true) {
      case this.companiesMenuVisible:
        return html`
          <ul class="menu-list">
            <li><a href="/service.html">Company Service 1</a></li>
            <li><a href="/service.html">Company Service 2</a></li>
            <li><a href="/service.html">Company Service 3</a></li>
          </ul>
        `;
      case this.individualsMenuVisible:
        return html`
          <ul class="menu-list">
            <li><a href="/service.html">Individuals Service 1</a></li>
            <li><a href="/service.html">Individuals Service 2</a></li>
            <li><a href="/service.html">Individuals Service 3</a></li>
            <li><a href="/service.html">Individuals Service 4</a></li>
            <li><a href="/service.html">Individuals Service 5</a></li>
          </ul>
        `;
      case this.reviewsMenuVisible:
        return html`
          <ul class="menu-list">
            <li><a href="/service.html">Reviews 1</a></li>
            <li><a href="/service.html">Reviews 2</a></li>
            <li><a href="/service.html">Reviews 3</a></li>
          </ul>
        `;
      default:
        return html`
          <ul class="menu-list">
            <li><a href="/service.html">Contacts 1</a></li>
            <li><a href="/service.html">Contacts 2</a></li>
            <li><a href="/service.html">Contacts 3</a></li>
          </ul>
        `;
    }
  }

  private _handleMenuLeave() {
    this.menuOpened = false;
    this.companiesMenuVisible = false;
    this.individualsMenuVisible = false;
    this.reviewsMenuVisible = false;
    this.contactsMenuVisible = false;
  }

  private _handleMenuHover(key: string) {
    switch (key) {
      case "companies":
        this.menuOpened = true;
        this.companiesMenuVisible = true;
        this.individualsMenuVisible = false;
        this.reviewsMenuVisible = false;
        this.contactsMenuVisible = false;
        break;
      case "individuals":
        this.menuOpened = true;
        this.individualsMenuVisible = true;
        this.companiesMenuVisible = false;
        this.reviewsMenuVisible = false;
        this.contactsMenuVisible = false;
        break;
      case "reviews":
        this.menuOpened = true;
        this.reviewsMenuVisible = true;
        this.companiesMenuVisible = false;
        this.individualsMenuVisible = false;
        this.contactsMenuVisible = false;
        break;
      case "contacts":
        this.menuOpened = true;
        this.contactsMenuVisible = true;
        this.companiesMenuVisible = false;
        this.individualsMenuVisible = false;
        this.reviewsMenuVisible = false;
        break;
      default:
        this.menuOpened = false;
        this.contactsMenuVisible = false;
        this.companiesMenuVisible = false;
        this.individualsMenuVisible = false;
        this.reviewsMenuVisible = false;
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

  static styles = css`
    header {
      background-color: var(--white) !important;
    }
    .title-list {
      display: flex;
      justify-content: center;
    }
    .title-list li {
      display: inline;
      margin: 0 2rem;
      font-size: 1.1rem;
      cursor: pointer;
      color: var(--lawyer-dark-blue);
    }
    .title-list li:hover {
      color: var(--lawyer-orane);
    }
    a {
      text-decoration: none;
    }
    a:visited {
      color: var(--lawyer-dark-blue);
    }
    a:hover {
      color: var(--lawyer-orane);
    }

    .current-link {
      color: var(--lawyer-orane) !important;
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
        height: 4rem;
      }
      100% {
        height: 3rem;
      }
    }
    @keyframes menuListAppearance {
      0% {
        color: transparent;
      }
      50% {
        color: var(--lawyer-dark-blue);
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
    }
    .menu-list a {
      animation: menuListAppearance 1s ease-in 0s;
      color: var(--lawyer-dark-blue);
    }
    .menu-list a:hover {
      color: var(--lawyer-orane);
    }
    .menu-visible {
      position: absolute;
      top: 0;
      width: 100%;
      background-color: var(--white);
      animation: backgroundMoveForward 50ms ease-in 0s;
    }
    .menu-hidden {
      position: absolute;
      top: 0;
      width: 100%;
      background-color: transparent;
      animation: backgroundMoveBackward 50ms ease-out 0s;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "main-menu": MainMenu;
  }
}
