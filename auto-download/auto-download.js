import "https://unpkg.com/@patternfly/pfe-toast/dist/pfe-toast.min.js?module";

class AutoDownload extends HTMLElement {
  static get tag() {
    return "auto-download";
  }

  static get observedAttributes() {
    return ["mode"];
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template();
  }

  connectedCallback() {
    this._init();
  }

  styles() {
    return `
      <style>
        pfe-toast {
          z-index: 9999;
        }
      </style>
    `
  }

  template() {
    return `
      ${this.styles()}
      ${this.isMobile ? `
        <pfe-toast>
          <slot name="mobile">
            <p>You've been successfully toasted!</p>
          </slot>
        </pfe-toast>
      ` : ''}
      <slot><slot>
    `;
  }

  _init() {
    // Get an a tag
    if (!this.isMobile) {
      this.querySelector("a[download]").click();
    }
    else {
      this.shadowRoot.querySelector("pfe-toast").open();
    }
  }

  get isMobile() {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    )
  }
}

export { AutoDownload };
