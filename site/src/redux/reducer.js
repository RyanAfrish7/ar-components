import { NAVIGATE, RECEIVE_COMPONENTS, REQUEST_COMPONENTS } from "./actions";

export const Pages = {
    HOME_PAGE: "home",
};

const INITIAL_STATE = {
    components: [],
    location: {
        page: Pages.HOME_PAGE,
    },
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NAVIGATE:
            return {
                ...state,
                routeData: action.routeData,
            };
        case REQUEST_COMPONENTS:
            return {
                ...state,
                components: {
                    ...state.components,
                    isFetching: true,
                },
            };
        case RECEIVE_COMPONENTS:
            return {
                ...state,
                components: {
                    value: action.components,
                    isFetching: false,
                },
            };
        default:
            return state;
    }
};
