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
   * @param {ticket} ticket
   */
  addItem(ticket) {
    this.item = document.createElement('div');
    this.item.dataset.id = ticket.id;
    this.item.classList.add('item');
    this.getMarkup(ticket);
  }

  /**
   * Add marker to this.item
   *
   * @param {ticket} ticket
   */
  getMarkup(ticket) {
    const checked = ticket.status === true ? 'checked' : '';
    this.item.innerHTML = `
    <div class="item-inner">
      <input 
      class="item-status" 
      type="checkbox" 
      id="item-status-${ticket.id}" ${checked}/>
      <label class="checkbox-mark" for="item-status-${ticket.id}"></label>
      <div class="item-name">${ticket.name}</div>
      <div class="item-date" data-name="${ticket.name}">
      ${new Date(ticket.created).toLocaleDateString()}
      </div>
      <button class="btn btn-item btn-edit">✎</button>
      <button class="btn btn-item btn-delete">✘</button>
    </div>
    <div class="item-description"></div>
    `;
  }

  /**
   * @param {ticket} ticket
   *
   * @return this.item
   */
  getItem(ticket) {
    this.addItem(ticket);

    return this.item;
  }
}
