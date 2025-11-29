import { AbstractComponent } from '../framework/view/abstractComponent.js';

function createNavigationTemplate(activeTab) {
    return `
        <div class="navigationsBtn">
            <button class="myDiaryBtn ${activeTab === "diary" ? "active" : ""}">
                Личный дневник
            </button>

            <button class="visitHistoryBtn ${activeTab === "visits" ? "active" : ""}">
                История посещения врачей
            </button>
        </div>
    `;
}


export default class NavigationComponent extends AbstractComponent {
    #activeTab = null;

    constructor(activeTab) {
        super();
        this.#activeTab = activeTab;
    }

    get template() {
        return createNavigationTemplate(this.#activeTab);
    }

    setHandlers(onDiaryClick, onVisitClick) {
         const diaryBtn = this.element.querySelector(".myDiaryBtn");
        const visitBtn = this.element.querySelector(".visitHistoryBtn");

        diaryBtn.addEventListener("click", () => {
            this.#setActive("diary");
            onDiaryClick?.();
        });

        visitBtn.addEventListener("click", () => {
            this.#setActive("visit");
            onVisitClick?.();
        });
    }

    #setActive(tab) {
        this.#activeTab = tab;

        const diaryBtn = this.element.querySelector(".myDiaryBtn");
        const visitBtn = this.element.querySelector(".visitHistoryBtn");

        diaryBtn.classList.toggle("active", tab === "diary");
        visitBtn.classList.toggle("active", tab === "visit");
    }

}