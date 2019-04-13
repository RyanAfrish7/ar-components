import { html } from "lit-element";
import "@polymer/iron-demo-helpers/demo-snippet";
import "@ryanafrish7/ar-picker";

export default html`
    <h3>Basic usage</h3>
    <ar-picker style="height: 240px; max-width: 360px; margin: auto;" .items=${[
                "Aries", "Aquarius", "Cancer", "Capricorn", "Gemini", "Leo", "Libra",
                "Ophiuchus", "Pisces", "Sagittarius", "Scorpio", "Taurus", "Virgo",
            ]}></ar-picker>
`;
