import { LitElement, html } from "lit-element";
import { connect } from "pwa-helpers";
import store from "../redux/store";

import "@polymer/iron-icon";
import "@polymer/iron-icons";
import "@polymer/iron-icons/image-icons";
import "@polymer/paper-icon-button";
import { loadComponents } from "../redux/actions";

class HomePage extends connect(store)(LitElement) {
    static get properties() {
        return {
            components: { type: Array },
        };
    }

    render() {
        return html`
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    flex-grow: 1;
                }

                .space {
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    margin: 24px 0;
                    padding: 36px;
                    width: 100%;
                    justify-content: space-evenly;
                    max-width: 960px;
                }

                #header {
                    width: 100%;
                    flex-direction: column;
                    align-items: center;
                    margin: 10vh 0;
                    text-align: center;
                }

                #footer {
                    font-size: 14px;
                    margin: 6vh 0 4vh 0;
                }

                .card {
                    padding: 24px;
                    border-radius: 24px;
                    width: 400px;
                    height: 200px;
                    background-color: rgba(77, 77, 77, 0.01);
                    box-shadow: 0 8px 4px rgba(0, 0, 0, 0.0), 0 4px 2px rgba(0, 0, 0, 0.0);
                    transition: background-color 0.2s, box-shadow 0.2s, transform 0.4s;
                    margin: 24px 12px;
                }

                .card .header {
                    display: flex;
                    flex-direction: row;
                    align-items: baseline;
                }

                .card .title {
                    font-size: 27px;
                    font-weight: 500;
                    margin: 0;
                }

                .card:hover {
                    background-color: rgba(0, 0, 0, 0.01);
                    box-shadow: 0 8px 56px rgba(0, 0, 0, 0.1), 0 4px 24px rgba(0, 0, 0, 0.07);
                    transform: perspective(1px) scale(1.05);
                    transition: background-color 0.2s 0.3s, box-shadow 0.7s 0.3s, transform 0.4s 0.3s;
                }

                .card .version {
                    color: rgba(0, 0, 0, 0.42);
                    font-size: 14px;
                    margin: 0 12px;
                }

                .card p {
                    line-height: 1.6;
                    font-size: 16px;
                    color: rgba(0, 0, 0, 0.54);
                }

                .show-on-hover {
                    opacity: 0;
                    transform: scale(0);
                    transition: opacity 0.8s 0.3s, transform 0 0.8s;
                }

                .card:hover .show-on-hover {
                    opacity: 1;
                    transform: scale(1);
                    transition: opacity 1.2s 0.3s;
                }

                paper-icon-button {
                    color: rgba(0, 0, 0, 0.6);
                }

                paper-icon-button:hover {
                    color: black;
                }

                a.icon {
                    text-decoration: none;
                }
            </style>
            <div id="header">
                <h1 style="font-weight: 500">ar-components</h1>
                <p style="color: rgba(0, 0, 0, 0.54)">Built proudly on lit-html</p>
            </div>
            <div class="space">
                ${this.components.map(HomePage.renderCard)}
            </div>
            <div id="footer">
                Making web better one component at a time
            </div>
        `;
    }

    stateChanged(state) {
        this.components = state.components.value;
    }

    constructor() {
        super();

        store.dispatch(loadComponents());
    }

    static renderCard(component) {
        return html`
            <div class="card">
                <div class="header">
                    <div class="title">${component.shortName}</div>
                    <div class="version show-on-hover">${component.version}</div>
                </div>
                <div class="content">
                    <p>${component.description}</p>
                    <a class="icon" target="_blank" href=${component.repositoryUrl}>
                        <paper-icon-button class="show-on-hover" icon="icons:description" title="Show documentation"></paper-icon-button>
                    </a>
                    <a class="icon" target="_blank" href=${component.repositoryUrl}>
                        <paper-icon-button class="show-on-hover" icon="icons:code" title="Show repository"></paper-icon-button>
                    </a>
                    <a class="icon" target="_blank" href="#">
                        <paper-icon-button class="show-on-hover" icon="image:remove-red-eye" title="Show demo"></paper-icon-button>
                    </a>
                </div>
            </div>
        `;
    }
}

customElements.define("home-page", HomePage);
