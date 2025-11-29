import { AbstractComponent } from '../framework/view/abstractComponent.js'

function createHeaderComponentTemplate() {
    return (
        `
        <header>
            <nav class="navigation">
                <div class="logo">
                    <img src="img/logo.png">
                    <span class="logoText">AniTrack</span>
                </div>
                <button class="myPets btn btnOutline">Мои питомцы</button>
            </nav>
        </header>
    `
    );
}

export default class HeaderComponent extends AbstractComponent {
    get template() {
        return createHeaderComponentTemplate();
    }
}