export class ElementPopup{

    constructor(obj){

    }


    static #template = document.createElement("template");
    static #template_innerHTML = this.#template.innerHTML = /*HTML*/ `
        <div class="tPopup">
            <div class="tElementContainer">
                <div class="tClosePopup">x</div>
                <div class="tPopupContainer></div>
            </div>
        </div>
    `;
}