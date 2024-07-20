export default class Hero {
  static htmlTemplateurl =
    './assets/templates/pages/landing-page/section/hero.html';
  static element: HTMLElement = document.createElement('section');

  static render(): HTMLElement {
    if (this.element) {
      fetch(this.htmlTemplateurl)
        .then((response) => response.text())
        .then((html) => {
          this.element.outerHTML = html;
        });
    }
    return this.element;
  }
}
