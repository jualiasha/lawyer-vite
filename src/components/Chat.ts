import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Marked } from "@ts-stack/markdown";

@customElement("chat-helper")
export class Chat extends LitElement {
  /**
   * Chat introduction text.
   */
  @property({ type: Object })
  _introduction: string = ``;

  connectedCallback() {
    super.connectedCallback();
    const self = this;
    // @ts-ignore
    import("../assets/content/chat-introduction.md").then((res) => {
      fetch(res.default)
        .then((response) => response.text())
        .then((text) => {
          self._introduction = Marked.parse(text);
        });
    });
  }

  protected willUpdate(_changedProperties: PropertyValues) {
    console.log(_changedProperties, this._introduction);
    if (_changedProperties.has("_introduction") && this._introduction.length) {
      this.type("#introduction", this._introduction);
    }
  }

  render() {
    return html`
      <div class="chat">
        <div id="introduction" class="block"></div>
        <div id="helper" class="block"></div>
      </div>
    `;
  }

  public type(selector: string, mdTemplate: string) {
    // Get the paragraph element
    const typingText: HTMLElement | null =
      this.renderRoot.querySelector(selector);
    let index: number = 0;
    const speed = 10;
    // debugger;
    const typeWriter = (): void => {
      // Check if all HTML template has been typed
      if (index < mdTemplate.length && typingText) {
        // Append next character to the paragraph element
        if (index === mdTemplate.length - 1) {
          typingText.innerHTML = `${mdTemplate.substring(0, index + 1)}`;
        } else {
          typingText.innerHTML = `${mdTemplate.substring(
            0,
            index + 1
          )}<span class="cursor">&nbsp;</span>`;
        }
        index++;

        // Call the function recursively after a certain delay
        setTimeout(typeWriter, speed);
      }
    };
    typeWriter();
  }

  static styles = css`
    .chat {
      display: flex;
      justify-content: space-around;
      margin-top: 1.5rem;
    }
    .block {
      background-color: var(--lawyer-dark-blue);
      color: var(--white);
      width: 45%;
      height: 75vh;
      border-radius: 2rem;
      padding: 1rem;
      overflow-y: auto;
    }
    .cursor {
      display: inline-block;
      background-color: #ccc;
      margin-left: 0.1rem;
      width: 10px;
      animation: blink 1s infinite;
    }
    .cursor.typing-finished {
      animation: none;
    }
    @keyframes blink {
      0% {
        background-color: #ccc;
      }
      49% {
        background-color: #ccc;
      }
      50% {
        background-color: transparent;
      }
      99% {
        background-color: transparent;
      }
      100% {
        background-color: #ccc;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-helper": Chat;
  }
}
