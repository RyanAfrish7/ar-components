export const NAVIGATE = "NAVIGATE";
export const navigate = location => ({
    type: NAVIGATE,
    location,
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

export const loadComponents = () => (dispatch) => {
    dispatch(requestComponents());

    return fetch("/components.json")
        .then(
            response => response.json(),
            error => console.error("Failed to fetch components.json", error),
        )
        .then(components => dispatch(receiveComponents(components)));
};
