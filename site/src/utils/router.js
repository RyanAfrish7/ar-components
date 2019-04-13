import { Path } from "path-parser";

export class Router {
    static comparePathTemplateSpecificity(lhs, rhs) {
        const [lhsComponents, rhsComponents] = [lhs.split("/"), rhs.split(".")];

        if (lhsComponents.length > rhsComponents.length) {
            return 1;
        }

        if (lhsComponents.length < rhsComponents.length) {
            return -1;
        }

        for (let i = 0; i < lhsComponents.length; i += 1) {
            const isLhsComponentTemplated = lhsComponents[i].startsWith(":");
            const isRhsComponentTemplated = rhsComponents[i].startsWith(":");

            if ((isLhsComponentTemplated && !isRhsComponentTemplated) 
                || (!isLhsComponentTemplated && isRhsComponentTemplated)) {
                if (isLhsComponentTemplated) {
                    return 1;
                }

                if (isRhsComponentTemplated) {
                    return -1;
                }
            }
        }

        return 0;
    }

    constructor(defaultRouteData) {
        this.routes = new Map();
        this.defaultRouteData = defaultRouteData;
    }

    registerPath(pathTemplate, routeData) {
        this.routes.set(pathTemplate, { path: new Path(pathTemplate), routeData });
    }

    unregisterPath(pathTemplate) {
        this.routes.delete(pathTemplate);
    }

    matchPath(pathname) {
        let matchedTemplate = null;

        this.routes.forEach(({ path }, pathTemplate) => {
            if (path.test(pathname)) {
                if (!matchedTemplate) {
                    matchedTemplate = pathTemplate;
                    return;
                }

                if (Router.comparePathTemplateSpecificity(pathTemplate, matchedTemplate) > 0) {
                    matchedTemplate = pathTemplate;
                }
            }
        });

        if (!matchedTemplate) {
            return this.defaultRouteData;
        }

        const matchedRoute = this.routes.get(matchedTemplate);
        return {
            ...matchedRoute.routeData,
            ...matchedRoute.path.test(pathname),
        };
    }
}

export default Router;
