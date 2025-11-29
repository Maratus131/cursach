import { AbstractComponent } from '../framework/view/abstractComponent.js'

function createFooterComponentTemplate() {
    return (
        `
        <footer>
        <nav>
            <div class="footerMenu">
                <div class="logo">
                    <img src="img/logo.png">
                    <span class="logoText">AniTrack</span>
                </div>
                <div class="copyright">
                    AniTrack © 2025 - забота о питомцах с любовью
                </div>
            </div>
            <div class="socialNetworks">
                <img src="img/icons/tg.png">
                <img src="img/icons/vk.png">
                <img src="img/icons/yb.png">
            </div>
        </nav>
    </footer>
    `
    );
}

export default class FooterComponent extends AbstractComponent {
    get template() {
        return createFooterComponentTemplate();
    }
}