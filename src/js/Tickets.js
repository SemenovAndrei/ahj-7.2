/**
 * @class DownloadManager
 */
export default class Tickets {
  constructor(elements) {
    this.elements = elements;
    this.tickets = [];
    this.editCurrent = null;
    this.url = 'http://localhost:7777/tickets';
  }

  /**
   * init
   */
  init() {
    this.elements.init();
    this.addListeners();
    this.loadTickets();
    this.showTickets();
  }

  /**
   * Add Listeners
   */
  addListeners() {
    this.elements.body.addEventListener('click', this.logicBodyClick.bind(this));
    this.elements.content.addEventListener('click', this.logicContentClick.bind(this));
  }

  logicBodyClick(event) {
    if (event.target.classList.contains('form-active')) {
      this.elements.hideModal();
    }

    if (event.target.classList.contains('btn-cancel')) {
      this.elements.hideModal();
    }

    if (event.target.classList.contains('btn-confirm')) {
      event.preventDefault();

      // eslint-disable-next-line no-unused-expressions
      event.target.closest('.form-add')
        ? this.addTicket()
        : this.editTicket(this.editCurrent.id);
    }
  }

  /**
   * Handler event click
   *
   * @param {event} event
   */
  logicContentClick(event) {
    event.preventDefault();

    if (event.target.classList.contains('btn-add')) {
      this.elements.showModalAdd();
    }

    if (event.target.classList.contains('btn-edit')) {
      this.showFullTicket(event.target.closest('.item'), 'edit');
    }

    if (event.target.classList.contains('btn-delete')) {
      this.deleteTicket(event.target.closest('.item').dataset.id);
    }

    if (event.target.classList.contains('item-name')) {
      this.showFullTicket(event.target.closest('.item'));
    }
  }

  /**
   * Handler event click
   *
   * @param {event} event
   */
  async addTicket() {
    // const form = new FormData(document.forms[0]);

    const form = document.forms[0];

    if (Tickets.checkEmptyField()) {
      return;
    }

    const response = await fetch(`${this.url}?method=createTicket`, {
      method: 'POST',
      body: JSON.stringify({
        name: form.querySelector('.field-name').value,
        description: form.querySelector('.field-description').value,
      }),
    });

    if (response.status === 204) {
      form.querySelector('.field-name').value = '';
      form.querySelector('.field-description').value = '';
      this.elements.hideModal();
      this.loadTickets();
    }
  }

  async editTicket() {
    // const form = new FormData(document.forms[0]);

    const form = document.forms[0];

    if (Tickets.checkEmptyField()) {
      return;
    }

    const response = await fetch(`${this.url}/${this.editCurrent.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: form.querySelector('.field-name').value,
        description: form.querySelector('.field-description').value,
      }),
    });

    if (response.status === 204) {
      form.querySelector('.field-name').value = '';
      form.querySelector('.field-description').value = '';
      this.elements.hideModal();
      this.loadTickets();
    }
  }

  async loadTickets() {
    const response = await fetch(`${this.url}?method=allTickets`, { method: 'GET' });
    if (response.status === 200 && response.statusText === 'OK') {
      const resJson = await response.json();
      this.tickets = [];
      resJson.forEach((ticket) => this.tickets.push(ticket));
      this.showTickets();
    }
  }

  async showFullTicket(ticket, edit = false) {
    const response = await fetch(
      `${this.url}?method=ticketById&id=${ticket.dataset.id}`,
      { method: 'GET' },
    );
    if (response.status === 200 && response.statusText === 'OK') {
      const resJson = await response.json();

      if (edit) {
        this.editCurrent = resJson;
        this.elements.showModalEdit(this.editCurrent);
        return;
      }

      this.elements.resetItemDescription();
      const description = ticket.querySelector('.item-description');
      description.classList.add('description-active');
      description.innerText = resJson.description;
    }
  }

  showTickets() {
    this.elements.resetTickets();
    this.tickets.forEach((ticket) => this.elements.addItem(ticket));
  }

  static checkEmptyField() {
    const form = document.forms[0];
    const fields = form.querySelectorAll('[id^=field-');

    [...fields].forEach((field) => {
      if (!field.value) {
        field.classList.add('field-invalid');
        return true;
      }
      field.classList.remove('field-invalid');
      return false;
    });

    if ([...fields].every((field) => field.value)) {
      return false;
    }
    return true;
  }

  async deleteTicket(id) {
    const response = await fetch(`${this.url}/${id}`, { method: 'DELETE' });
    if (response.status === 204) {
      this.loadTickets();
    }
  }
}
