export class ManageImagesPopup{
    /**
     * ManageImagesPopup is to manage a list of images.
     * It returns a Promise with the image id for the selected image.
     * A custom func callback can be given to manage how to delete a image, it
     * takes the id of the image as a parameter.
     * 
     * @param {Object} obj 
     * @param {HTMLElement} obj.parent
     * @param {Object[]} obj.images
     * @param {Number} obj[].images.id
     * @param {String} obj[].images.url
     * @param {String} obj[].images.name
     * @param {(imageId: Number) => void} obj.imagesFunc
     * @returns {Promise.<Number>}
     */
    constructor(obj){
        return new Promise((resolve, reject)=>{
            /** @type {DocumentFragment} */
            const df = ManageImagesPopup.#template.content.cloneNode(true);

            const popup = df.querySelector(".t-popup");

            if(obj.parent){
                obj.parent.append(df);
            }else{
                document.body.append(df);
            }

            const manageImageContainer = popup.querySelector(".t-manage-image-container");

            for(const imageData of obj.images){
                /** @type {DocumentFragment} */
                const imageDf = ManageImagesPopup.#imageTemplate.content.cloneNode(true);

                const imageContainer = imageDf.querySelector(".t-image-container");
                imageContainer.setAttribute("id", imageData["id"]);
                manageImageContainer.append(imageContainer);

                imageContainer.addEventListener("click", ()=>{
                    manageImageContainer.querySelectorAll("[selected]").forEach(el=>{
                        el.removeAttribute("selected");
                    })
                    imageContainer.setAttribute("selected", true);
                })

                imageContainer.querySelector("img").src = imageData["url"];
                imageContainer.querySelector(".t-image-name").innerText = imageData["name"];
                imageContainer.querySelector(".t-delete-button").addEventListener("click", async ()=>{
                    obj.imagesFunc(imageData["id"]);
                })
            }

            /** @type {HTMLButtonElement} */
            const selectButton = manageImageContainer.querySelector(".t-select-button");
            selectButton.addEventListener("click", ()=>{
                const selectedImage = manageImageContainer.querySelector(`.t-image-container[selected]`)
                resolve(selectedImage.getAttribute("id"));
            });
        
            /** @type {HTMLButtonElement} */
            const closeButton = manageImageContainer.querySelector(".t-close-button");
            closeButton.addEventListener("click", ()=>{
                popup.remove();
            })
        })
    }

    static #template = document.createElement("template");
    static #template_innerHTML = this.#template.innerHTML = /*HTML*/`
        <div class="t-popup">
            <div class="t-manage-image-container">
                <div class="t-images-container"></div>
                <div class="t-button-container">
                    <button class="t-select-button">Select</button>
                    <button class="t-close-button">Close</button>
                </div>
            </div>
        </div>
    `;

    static #imageTemplate = document.createElement("template");
    static #imageTemplate_innerHTML = this.#imageTemplate.innerHTML = /*HTML*/`
        <div class="t-image-container">
            <img>
            <p class="t-image-name"></p>
            <button class="t-delete-button">Delete</button>
        </div>
    `;
}