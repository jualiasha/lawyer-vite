import {LitElement, css, html, PropertyValues} from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('main-menu')
export class MainMenu extends LitElement {

    /**
     * Copy for the read the docs hint.
     */
    @property({ type: Boolean })
    menuOpened:boolean = false

    @state()
    private _home : HTMLObjectElement|null = null;
    private _companies : HTMLObjectElement|null = null;
    private _individuals : HTMLObjectElement|null = null;
    private _reviews : HTMLObjectElement|null = null;
    private _contacts : HTMLObjectElement|null = null;

    render() {
        return html`
      <nav >
          <ul>
              <li id="home">
                  <a href="/index.html">Home</a>
              </li>
              <li id="companies">
                  Companies
              </li>
              <li id="individuals">
                  Individuals
              </li>
              <li id="reviews">
                  Reviews
              </li>
              <li id="contacts">
                  Contacts
              </li>
          </ul>
      </nav>
    `
    }

    protected firstUpdated(_changedProperties: PropertyValues ) {
        console.log(_changedProperties)
        this._home=this.renderRoot.querySelector('#home')
        this._companies=this.renderRoot.querySelector('#companies')
        this._individuals=this.renderRoot.querySelector('#individuals')
        this._reviews=this.renderRoot.querySelector('#reviews')
        this._contacts=this.renderRoot.querySelector('#contacts')
        this._home?.addEventListener('mouseover', ()=>this._handleMenuHover('home'))
        this._companies?.addEventListener('mouseover', ()=>this._handleMenuHover('companies'))
        this._individuals?.addEventListener('mouseover', ()=>this._handleMenuHover('individuals'))
        this._reviews?.addEventListener('mouseover', ()=>this._handleMenuHover('reviews'))
        this._contacts?.addEventListener('mouseover', ()=>this._handleMenuHover('contacts'))
        this._home?.addEventListener('mouseleave', ()=>this._handleMenuLeave())
        this._companies?.addEventListener('mouseleave', ()=>this._handleMenuLeave())
        this._individuals?.addEventListener('mouseleave', ()=>this._handleMenuLeave())
        this._reviews?.addEventListener('mouseleave', ()=>this._handleMenuLeave())
        this._contacts?.addEventListener('mouseleave', ()=>this._handleMenuLeave())
    }

    private _handleMenuLeave(){
        this.menuOpened=false
        console.log('close menu')
    }

    private _handleMenuHover(key:string){
        this.menuOpened=true
        switch (key) {
            case 'companies':
                console.log('this is companies');
                break;
            case 'individuals':
                console.log('this is individuals');
                break;
            case 'reviews':
                console.log('this is reviews');
                break;
            case 'contacts':
                console.log('this is contacts');
                break;
            default:
                console.log('this is home')
        }
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
