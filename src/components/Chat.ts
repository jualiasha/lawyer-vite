import { LitElement, css, html, PropertyValues, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("chat-helper")
export class Chat extends LitElement {
  @state()
  private _introduction: TemplateResult = html`<p>
      Звітайтесь, доброго дня/доброго вечора,
    </p>
    <p>
      Мене звуть [Ваше ім'я], і я досвідчений юрист, спеціалізуюся в галузі
      [галузі права]. Я дуже рада бути тут сьогодні і мати можливість
      представити себе.
    </p>
    Я працюю юристом вже понад 15 років, і протягом своєї кар'єри мені пощастило
    працювати з різноманітними клієнтами, включаючи фізичних осіб, корпорації та
    організації. Мої компетенції лежать в [конкретних галузях права], де я
    успішно вирішувала складні справи, надавала юридичні консультації та
    досягала вигідних угод.
    <p>
      Те, що робить мене особливою як юриста, це моя нехитра відданість
      досягненню найкращих можливих результатів для моїх клієнтів. Я підходжу до
      кожної справи з ретельним дослідженням, уважним ставленням до деталей та
      стратегічним мисленням. Я надто розумію важливість ефективної комунікації,
      як з моїми клієнтами, так і з протилежною стороною, оскільки я розумію, що
      будування сильних відносин сприяє позитивним вирішенням.
    </p>
    <p>
      Поміж моїми юридичними навичками я пишаюся тим, що є співчутливим і
      емпатичним захисником моїх клієнтів. Я намагаюся зрозуміти їх унікальні
      потреби та стурбованості, і працюю наполегливо, щоб забезпечити
      персоналізоване та ефективне юридичне представництво, зорієнтоване на їх
      конкретні обставини.
    </p>
    <p>
      Протягом всієї кар'єри я залишалась присвяченою оновленню своїх знань із
      новітніх розробок у правовій сфері. Я регулярно відвідую юридичні
      конференції, семінари та майстер-класи, і активно займаюся постійним
      професійним розвитком, щоб забезпечити, що мої клієнти отримують юридичні
      послуги найвищої якості. Я з нетерпінням чекаю можливості принести свої
      компетенції.
    </p> `;
  render() {
    return html`
      <div class="chat">
        <div id="introduction" class="block"></div>
        <div id="helper" class="block"></div>
      </div>
    `;
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    // const introduction=this.renderRoot.querySelector('#introduction')
    this.type("#introduction", this._introduction);
  }

  public type(selector: string, htmlTemplate: TemplateResult) {
    // Get the paragraph element
    const typingText: HTMLElement | null =
      this.renderRoot.querySelector(selector);
    let index: number = 0;
    const speed = 10;
    // debugger;
    const typeWriter = (): void => {
      const typedString: string = htmlTemplate.strings[0];
      // Check if all HTML template has been typed
      if (index < typedString.length && typingText) {
        // Append next character to the paragraph element
        if (index === typedString.length - 1) {
          typingText.innerHTML = `${typedString.substring(0, index + 1)}`;
        } else {
          typingText.innerHTML = `${typedString.substring(
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
    .cursor.typing-finnished {
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
