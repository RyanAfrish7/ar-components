import { LitElement, html } from "lit-element";
import { until } from "lit-html/directives/until";
import { connect, installRouter } from "pwa-helpers";
import store from "./redux/store";
import { navigate, loadComponents } from "./redux/actions";
import { Router } from "./utils/router";

class AppMain extends connect(store)(LitElement) {
    static get properties() {
        return {
            routeData: { type: Object },
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

            ${until(AppMain.renderPage(this.routeData))}
       `;
    }

    stateChanged(state) {
        this.routeData = state.routeData;
    }

    constructor() {
        super();

        store.dispatch(loadComponents());
        this.setupNavigation();
    }

    setupNavigation() {
        this.router = new Router({ page: "404" });
        this.router.registerPath("/", { page: "home" });
        this.router.registerPath("/components/:component", { page: "component", view: "docs" });
        this.router.registerPath("/components/:component/:view", { page: "component" });

        installRouter(location => store.dispatch(
            navigate(this.router.matchPath(location.pathname)),
        ));
    }

    static async renderPage(routeData) {
        switch (routeData.page) {
            case "home":
                await import("./views/home-page");
                return html`<home-page></home-page>`;
            case "component":
                await import("./views/component-page");
                return html`<component-page .view=${routeData.view}></component-page>`;
            default:
                return html`404`;
        }
    }
}

customElements.define("app-main", AppMain);
