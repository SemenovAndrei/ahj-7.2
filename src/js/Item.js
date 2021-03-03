/**
 * @class Item
 */
export default class Item {
  constructor() {
    this.item = null;
  }

  /**
   * Add this.item
   *
   * @param {file} file
   */
  addItem(file) {
    this.item = document.createElement('div');
    this.item.classList.add('item');
    this.getMarkup(file);
  }

  /**
   * Add marker to this.item
   *
  * @param {file} file
   */
  getMarkup(file) {
    const size = file.url.split(',')[1];
    const sizeInMb = (window.atob(size).length / 1024 / 1024).toFixed(2);

    this.item.innerHTML = `
      <div class="item-name">${file.name}</div>
      <div class="item-size">${sizeInMb} Mb</div>
      <div class="item-link" data-name="${file.name}">
      <a class='link' href="${file.url}" download="${file.name}" rel="noopener" data-size="${sizeInMb}">Download</a>
      </div>
      `;
  }

  /**
   * @param {file} file
   *
   * @return this.item
   */
  getItem(file) {
    this.addItem(file);

    return this.item;
  }
}
