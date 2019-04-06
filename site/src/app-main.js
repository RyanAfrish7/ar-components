import { LitElement, html } from "lit-element";
import { until } from "lit-html/directives/until";
import { connect } from "pwa-helpers";
import store from "./redux/store";

class AppMain extends connect(store)(LitElement) {
    static get properties() {
        return {
            location: { type: Object },
        };
    }

    render() {
        return html`
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
            </style>

            ${until(AppMain.renderPage(this.location))}
       `;
    }

    stateChanged(state) {
        this.location = state.location;
    }

    static async renderPage(location) {
        switch (location.page) {
            case "home":
                await import("./views/home-page");
                return html`<home-page></home-page>`;
            default:
                return html`404`;
        }
    }
}

customElements.define("app-main", AppMain);
