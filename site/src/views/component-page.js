import { LitElement, html } from "lit-element";
import { connect } from "pwa-helpers";
import { until } from "lit-html/directives/until";
import store from "../redux/store";
import sharedStyles from "../shared/styles";
import "@polymer/paper-icon-button";
import "@polymer/iron-icons";

class ComponentPage extends connect(store)(LitElement) {
    static get properties() {
        return {
            component: { type: Object },
            components: { type: Array },
            networkActivity: { type: Boolean },
        };
    }

    render() {
        return html`
            ${sharedStyles}
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    height: 100vh;
                }

                h3 > a {
                    text-decoration: none;
                    color: inherit;
                }

                #header {
                    position: sticky;
                    top: 0;
                    display: flex;
                    justify-content: space-around;
                }

                #space {
                    max-width: 960px;
                    width: 100%;
                    margin: 48px auto;
                    flex-grow: 1;
                }
            </style>
            <div id="header">
                <h3><a href="/">ar-components</a></h3>
            </div>
            <div id="space">
                <div class="header">
                    <div class="component-title" style="margin: 0">${this.component.shortName}</div>
                    <div class="component-version">${this.component.version}</div> 
                </div>
                <div class="content">
                    <p>${this.component.description}</p>
                    <div class="demo">
                        ${until(import(`../demos/${this.component.shortName}`).then(module => module.default), html`loading..`)}
                    </div>
                </div>
            </div>
        `;
    }

    stateChanged(state) {
        this.networkActivity = state.components.isFetching;
        if (!this.networkActivity) {
            this.components = state.components.value;
            this.component = this.components.find(component => component.shortName === state.routeData.component);
        }
    }
}

window.customElements.define("component-page", ComponentPage);
