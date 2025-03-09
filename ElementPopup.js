export class ElementPopup{

    /**
     * ElementPopup takes an object as its parameter. It then allows
     * the user to give an HTMLElement to attach and display with a close button.
     * 
     * @param {Object} obj 
     * @param {HTMLElement|DocumentFragment} obj.element Element to append to popup
     * @param {HTMLElement} obj.parent Element to append popup to. Defaults to document.body
     */
    constructor(obj){
        if(!obj.element || !(obj.element instanceof HTMLElement || obj.element instanceof DocumentFragment)){
            throw new Error("No HTMLElement was given");
        }

        /** @type {DocumentFragment} */
        const df = ElementPopup.#template.content.cloneNode(true);

        /** @type {HTMLDivElement} */
        const popup = df.querySelector(".t-popup");

        // Appent popup to parent if given else to body
        if(obj.parent){
            obj.parent.append(df);
        }else{
            document.body.append(df);
        }

        /** @type {HTMLDivElement} */
        const closePopup = popup.querySelector(".t-close-popup");
        closePopup.addEventListener("click", ()=>{
            popup.remove();
        })

        /** @type {HTMLDivElement} */
        const elementContainer = popup.querySelector(".t-element-container");
        elementContainer.append(obj.element);
    }


    static #template = document.createElement("template");
    static #template_innerHTML = this.#template.innerHTML = /*HTML*/ `
        <div class="t-popup">
            <style>
                .t-element-container{
                    position: relative;
                }
                .t-close-popup{
                    position: absolute;
                    top: 0;
                    right: 1em;
                }
            </style>
            <div class="t-element-container">
                <div class="t-close-popup">x</div>
                <div class="t-popup-container></div>
            </div>
        </div>
    `;
}