import { html } from "lit-element";
import "@polymer/iron-demo-helpers/demo-snippet";
import "@ryanafrish7/ar-picker";

const zodiacIconMap = {
    Aries: "♈",
    Aquarius: "♒",
    Cancer: "♋",
    Capricorn: "♑",
    Gemini: "♊",
    Leo: "♌",
    Libra: "♎",
    Ophiuchus: "⛎",
    Pisces: "♓",
    Sagittarius: "♐",
    Scorpio: "♏",
    Taurus: "♉",
    Virgo: "♍",
};

const selectSign = (root, event) => {
    const sign = root.querySelector("#sign");
    sign.animate({
        filter: ["blur(0)", "blur(50px)", "blur(0)"],
        opacity: [1, 0.2, 1],
    }, 800);

    setTimeout(() => { sign.innerText = zodiacIconMap[event.detail.selected]; }, 400);
};

export default root => html`
    <h3>Getting started</h3>
    <p>Set the <code>items</code> property of the element to the list of values.</p>
    <p>
        It emits <code>select</code> event when the wheel is scrolled resulting in a new item being
        selection or when an item is clicked.
    </p>
    <h3>Example</h3>
    <div style="margin: 36px 0; display: flex; justify-content: space-evenly; align-items: center">
        <ar-picker style="height: 240px; width: 360px; border: 2px solid #444"
            .items=${Object.keys(zodiacIconMap)} @select=${event => selectSign(root, event)}>
        </ar-picker>
        <h1 id="sign" style="font-size: 90px; font-weight: bold; margin: 0"></h1>
    </div>
`;
