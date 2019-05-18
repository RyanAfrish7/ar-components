import ComponentModel from "../model/component-model";

export const NAVIGATE = "NAVIGATE";
export const navigate = routeData => ({
    type: NAVIGATE,
    routeData,
});

export const REQUEST_COMPONENTS = "REQUEST_COMPONENTS";
export const requestComponents = () => ({
    type: REQUEST_COMPONENTS,
});

export const RECEIVE_COMPONENTS = "RECEIVE_COMPONENTS";
export const receiveComponents = components => ({
    type: RECEIVE_COMPONENTS,
    components,
});

export const REQUEST_COMPONENT_README = "REQUEST_COMPONENT_README";
export const requestComponentReadme = component => ({
    type: REQUEST_COMPONENT_README,
    component,
});

export const loadComponents = () => (dispatch) => {
    dispatch(requestComponents());

    return fetch("/data/packages.json")
        .then(
            response => response.json(),
            error => console.error("Failed to fetch components.json", error),
        )
        .then(components => components.map(component => new ComponentModel(component)))
        .then(components => dispatch(receiveComponents(components)));
};
