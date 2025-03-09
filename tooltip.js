export class Tooltip{
    /** @type {HTMLDivElement} */
    #tooltipContainer;

    /** @type {HTMLElement[]} */
    #targetElements = [];

    /**
     * @typedef {Object} Options
     * @property {HTMLElement|String} target
     * @property {'static'|'dynamic'} type
     * @property {String} message
     * @property {String} class
     */

    /**
     * @param {Options[]} input
     * @param {Options} options
     */

    constructor(input, options={}){
        if(input instanceof HTMLElement || input instanceof String){
            options["target"] = input;
            input = [options];
            // this.#targetElements.push(input);
            // this.SetElementTooltipDatum(input, options["message"]);
            // options["target"] = input;
            // input = options;
        }
        
        // if(input instanceof String){
            // const element = document.querySelector(input);
            // if(!element){
            //     this.#targetElements.push(element);
            //     this.SetElementTooltipDatum(element, options["message"]);
            //     options["target"] = input;
            //     input = options;
            // }
        // }

        /** @type {DocumentFragment} */
        const df = Tooltip.#tooltip_template.content.cloneNode(true);
        
        // Bind the tooltip element to the class and append tooltip to body
        this.#tooltipContainer = df.querySelector(".t-tooltip-container");
        document.body.append(df);

        // Throw error if no HTMLElement is given
        if(!(input instanceof Array)){
            throw new Error("Tooltip requires an array of targets (HTMLElement | HTMLElement querySelector value) to fire events on");
        }
        
        const itemsQueried = [];
        for(const targetInfo of input){
            const target = targetInfo.target;

            // If target is HTMLElement set element
            if(target instanceof HTMLElement){
                this.#targetElements.push(target);
                this.SetElementTooltipDatum(target, targetInfo["message"]);
            }

            // If target is a string, try to get element by queryselector. If not found throw error.
            if(target instanceof String){
                if(itemsQueried.find(val=>val==target)){
                    continue;
                }
                itemsQueried.push(target);

                const elements = document.querySelectorAll(target);
                elements.forEach(el=>{
                    this.#targetElements.push(el);
                    this.SetElementTooltipDatum(el, targetInfo["message"]);
                })
            }

            // Set custom class for tooltip
            if(targetInfo.class){
                this.#targetElements[input.length-1].classList.add(targetInfo.class);
            }
        
            // Add events depending on the type
            switch(input.type){
                case "dynamic":
                    break;
                case "static":
                
                default:
            }
            }



    }

    /**
     * @param {HTMLElement} element
     * @param {String} message
     */
    SetElementTooltipDatum(element, message){
        element.TooltipMessage = message;
    }

    /** @type {Boolean} */
    #active = false;

    AddStaticMouseEnterEvent(){
        this.#targetElements.addEventListener("mouseenter", ()=>{
            /* Append element to target element and remove hidden property and set this.active to true */
            this.#tooltipContainer.classList.toggle("tHidden", false);

        })
    }

    /** @type {HTMLTemplateElement} */
    static #tooltip_template = document.createElement("template");
    static #tooltip_template_innnerHTML = this.#tooltip_template.innerHTML = /*HTML*/`
        <div class="t-tooltip-container">
            <style>
                .tHidden{
                    display: none !important;
                }
            </style>
            <div class="t-tooltip-body">
                <div class="t-tooltip-message"></div>
            </div>
            <div class="t-tooltip-tail"></div>
        </div>
    `;
}