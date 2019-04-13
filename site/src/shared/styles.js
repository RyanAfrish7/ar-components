import { html } from "lit-element";

export default html`
    <style>
        h1, h2, h3 {
            font-weight: 500;
        }

        .header {
            display: flex;
            flex-direction: row;
            align-items: baseline;
        }

        a.icon {
            text-decoration: none;
            cursor: pointer;
        }

        paper-icon-button {
            color: rgba(0, 0, 0, 0.6);
        }

        paper-icon-button:hover {
            color: black;
        }

        .space {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            margin: 24px auto;
            width: 100%;
            max-width: 960px;
        }

        .footer {
            width: 100%
        }

        .component-title {
            font-size: 27px;
            font-weight: 500;
            margin: 0;
        }

        .component-version {
            color: rgba(0, 0, 0, 0.42);
            font-size: 14px;
            margin: 0 12px;
        }
    </style>
`;
