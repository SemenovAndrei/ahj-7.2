/**
 * @class Content
 */
export default class Content {
  constructor() {
    this.content = null;
  }

  /**
   * Add board to this
   */
  addContent() {
    this.content = document.createElement('div');
    this.content.classList.add('content');
    this.getMarkup();
  }

  /**
   * Add marker to this.content
   */
  getMarkup() {
    this.content.innerHTML = `
    <h2 class="content-title">Available Files (without sms and registration)</h2>
    <div class="items">
    </div>
    `;
  }

  /**
   * @return this.content
   */
  getContent() {
    this.addContent();

    return this.content;
  }
}
