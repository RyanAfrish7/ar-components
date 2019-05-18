import { LitElement, html } from "lit-element";
import { connect } from "pwa-helpers";
import { render } from "lit-html";

import store from "../redux/store";
import "@polymer/paper-icon-button";
import "@polymer/iron-icons";
import styles from "../shared/styles";

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
            ${styles}
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
                    <div class="component-title" style="margin: 0">${this.component.getShortName()}</div>
                    <div class="component-version">${this.component.version}</div> 
                </div>
                <div class="content">
                    <p>${this.component.description}</p>
                    <div id="demo"></div>
                </div>
            </div>
        `;
    }

    async updated() {
        const demo = this.shadowRoot.querySelector("#demo");
        if (!demo.shadowRoot) {
            demo.attachShadow({ mode: "open" });
        }

        const template = await import(`../demos/${this.component.getShortName()}`).then(module => module.default(demo.shadowRoot));

        render(
            html`
                ${styles}
                ${template}
            `,
            demo.shadowRoot,
        );
    }

    stateChanged(state) {
        this.networkActivity = state.components.isFetching;
        if (!this.networkActivity) {
            this.components = state.components.value;
            this.component = this.components
                .find(component => component.getShortName() === state.routeData.component);
        }
    }
}

window.customElements.define("component-page", ComponentPage);
