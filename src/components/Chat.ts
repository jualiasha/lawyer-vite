import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Marked } from "@ts-stack/markdown";

const speed: number = 10;

interface IChoice {
  id: string;
  name: string;
}

interface IChatHelper {
  start: string;
  firstChoice: { id: string; options: string };
  fizOsoby: IChoice[];
  jurOsoby: IChoice[];
}

@customElement("chat-helper")
export class Chat extends LitElement {
  /**
   * Chat introduction text.
   */
  @property({ type: Object })
  _introduction: string = ``;
  /**
   * Chat firstChoice text.
   */
  @property({ type: Object })
  _firstChoice: string = ``;
  /**
   * Chat firstChoice rendered toggle.
   */
  @property({ type: Object })
  _firstChoiceRendered: boolean = false;

  @state()
  private _helper: IChatHelper = {
    start: Marked.parse(
      "<h2> Яка послуга вас цікавить?</h2> <ul id='firstChoice'></ul> "
    ),
    firstChoice: {
      id: "fizOsoby",
      options:
        "<li>Послуги для фізичних осіб</li>" +
        "<li>Послуги для компаній</li>" +
        "<div class='nextChoice'></div>",
    },
    fizOsoby: [
      { id: "fizPosluga1", name: "Послуги для фізичних осіб 1" },
      { id: "fizPosluga2", name: "Послуги для фізичних осіб 2" },
      { id: "fizPosluga3", name: "Послуги для фізичних осіб 3" },
      { id: "fizPosluga4", name: "Задати індивідуальне питання" },
    ],
    jurOsoby: [
      { id: "jurPosluga1", name: "Послуги для компаній 1" },
      { id: "jurPosluga2", name: "Послуги для компаній 2" },
      { id: "jurPosluga3", name: "Послуги для компаній 3" },
      { id: "jurPosluga4", name: "Задати індивідуальне питання" },
    ],
  };

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

  private startHelper(helperTimeOut: number) {
    setTimeout(() => this.type("#helper", this._helper.start), helperTimeOut);
  }

  private firstOptionChoice(helperTimeOut: number) {
    const firstChoiceTimeOUt =
      helperTimeOut + speed * 1.5 * this._helper.start.length;

    setTimeout(() => {
      this.type("#firstChoice", this._helper.firstChoice.options);
    }, firstChoiceTimeOUt);
    setTimeout(
      () => (this._firstChoiceRendered = true),
      firstChoiceTimeOUt + 1500
    );
  }

  protected async willUpdate(_changedProperties: PropertyValues) {
    console.log(_changedProperties);
    if (_changedProperties.has("_introduction") && this._introduction.length) {
      await this.type("#introduction", this._introduction);
      const helperTimeOut = speed * 1.1 * this._introduction.length;
      this.startHelper(helperTimeOut);
      this.firstOptionChoice(helperTimeOut);
    }
    if (
      _changedProperties.has("_firstChoiceRendered") &&
      this._firstChoiceRendered
    ) {
      const firstChoiceLi = this.renderRoot.querySelectorAll("#firstChoice li");
      console.log(firstChoiceLi);
      firstChoiceLi.forEach((li) =>
        li.addEventListener("click", (e: Event) =>
          this.handleFirstChoiceLiClick(e)
        )
      );
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

  private handleFirstChoiceLiClick(e: Event) {
    console.log(e);
  }

  public type(selector: string, mdTemplate: string) {
    // Get the paragraph element
    const typingText: HTMLElement | null =
      this.renderRoot.querySelector(selector);
    let index: number = 0;
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
    #firstChoice {
      display: flex;
      justify-content: space-between;
      font-size: 1.6rem;
      list-style-type: circle;
      cursor: pointer;
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
