/* eslint-disable prefer-destructuring */
/**
 * @class Elements
 */
export default class Elements {
  constructor(content, item, data) {
    this.content = content.getContent();
    this.item = item;
    this.data = data;
    this.body = document.getElementsByTagName('body')[0];
  }

  /**
   * Init
   */
  init() {
    this.addElements();
    this.body.insertAdjacentElement('afterbegin', this.container);
    this.container.insertAdjacentElement('afterbegin', this.content);
  }

  /**
   * Add all elements
   */
  addElements() {
    this.addContainer();
    this.addItem();
  }

  /**
   * Add container
   */
  addContainer() {
    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.container.innerHTML = `
    <div class="downloaded"></div>
    `;
  }

  addItem() {
    // eslint-disable-next-line no-restricted-syntax
    for (const [, value] of Object.entries(this.data)) {
      const result = this.item.getItem(value);
      this.content.querySelector('.items').appendChild(result);
    }
  }
}
