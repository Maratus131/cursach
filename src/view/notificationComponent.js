import { AbstractComponent } from "../framework/view/abstractComponent.js";

function createNotificationComponent() {
    return `
        <div class="notificationAlert">
            <div class="notificationContent">
                <h4>Важное напоминание</h4>
                <p>
                    Дата последнего визита к врачу была более 2 месяцев назад. Рекомендуется записаться на осмотр.
                </p>
            </div>
            <button class="notificationClose">&times;</button>
        </div>
    `;
}

export default class NotificationComponent extends AbstractComponent {
    constructor() {
        super();

        const closeBtn = this.element.querySelector('.notificationClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', this.#closeHandler.bind(this));
        }
    }

    get template() {
        return createNotificationComponent();
    }

    #closeHandler(evt) {
        evt.preventDefault();
        this.element.remove();
    }
}