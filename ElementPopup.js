export class ElementPopup{

    /**
     * ElementPopup takes an object as its parameter. It then allows
     * the user to give an HTMLElement to attach and display with a close button.
     * 
     * @param {Object} obj 
     * @param {HTMLElement} obj.element Element to append to popup
     * @param {HTMLElement} obj.parent Element to append popup to. Defaults to document.body
     */
    constructor(obj){
        if(!obj.element || !(obj.element instanceof HTMLElement)){
            throw new Error("No HTMLElement was given");
        }

        /** @type {DocumentFragment} */
        const df = ElementPopup.#template.content.cloneNode(true);

        /** @type {HTMLDivElement} */
        const popup = df.querySelectorAll(".tPopup");

        // Appent popup to parent if given else to body
        if(obj.parent){
            obj.parent.append(df);
        }else{
            document.body.append(df);
        }

        /** @type {HTMLDivElement} */
        const closePopup = popup.querySelector(".tClosePopup");
        closePopup.addEventListener("click", ()=>{
            popup.remove();
        })

        /** @type {HTMLDivElement} */
        popupContainer = popup.querySelector(".tPopupContainer");
        popupContainer.append(obj.element);
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