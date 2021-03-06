/**
 * @class DownloadManager
 */
export default class Tickets {
  constructor(elements) {
    this.elements = elements;
    this.tickets = [];
    this.editCurrent = null;
    this.url = 'https://ahj-7-1.herokuapp.com/tickets';
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

  /**
   * Logic handle clicks events to body
   *
   * @param {event} event - event
   */
  logicBodyClick(event) {
    if (event.target.classList.contains('form-active')) {
      this.elements.hideModal();
    }

    if (event.target.classList.contains('btn-cancel')) {
      this.elements.hideModal();
    }

    if (event.target.classList.contains('btn-confirm')) {
      event.preventDefault();

      if (event.target.closest('.form-add')) {
        this.addTicket();
      }

      if (event.target.closest('.form-edit')) {
        this.editTicket(this.editCurrent.id);
      }

      if (event.target.closest('.form-delete')) {
        this.deleteTicket();
      }
    }
  }

  /**
   * Handler event clicks to content
   *
   * @param {event} event
   */
  logicContentClick(event) {
    if (event.target.classList.contains('checkbox-mark')) {
      const parent = event.target.closest('.item');
      const checkbox = parent.querySelector('.item-status');
      checkbox.checked = !checkbox.checked;

      this.editCurrent = this.tickets.filter((el) => el.id === Number(parent.dataset.id));
      this.editCurrent[0].status = checkbox.checked;
      this.updateStatus();
      return;
    }

    event.preventDefault();

    if (event.target.classList.contains('btn-add')) {
      this.elements.showModalAdd();
      return;
    }

    if (event.target.classList.contains('btn-edit')) {
      this.showFullTicket(event.target.closest('.item'), 'edit');
      return;
    }

    if (event.target.classList.contains('btn-delete')) {
      this.elements.showModalDelete(event.target.closest('.item').dataset.id);
      return;
    }

    if (/name|date/i.test(event.target.className)) {
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

  /**
   *
   * Send edit tickets to server
   */
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

  /**
   * Load tickets from server
   */
  async loadTickets() {
    const response = await fetch(`${this.url}?method=allTickets`, { method: 'GET' });
    if (response.status === 200 && response.statusText === 'OK') {
      const resJson = await response.json();
      this.tickets = [];
      resJson.forEach((ticket) => this.tickets.push(ticket));
      this.showTickets();
    }
  }

  /**
   * Load ticket with description
   *
   * @param {object} ticket - ticket
   * @param {boolean} edit - boolean
   *
   */
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

  /**
   * Show tickets on page
   */
  showTickets() {
    this.elements.resetTickets();
    this.tickets.forEach((ticket) => this.elements.addItem(ticket));
  }

  /**
   * Check empty fields on form
   *
   * @returns boolean
   */
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

  /**
   * Delete selected ticket
   */
  async deleteTicket() {
    const form = document.forms[0];

    const response = await fetch(
      `${this.url}/${form.querySelector('.field-delete').value}`,
      { method: 'DELETE' },
    );

    if (response.status === 204) {
      this.elements.hideModal();

      this.loadTickets();
    }
  }

  async updateStatus() {
    const response = await fetch(`${this.url}/${this.editCurrent[0].id}`, {
      method: 'PUT',
      body: JSON.stringify({
        status: this.editCurrent[0].status,
      }),
    });

    if (response.status === 204) {
      this.loadTickets();
    }
  }
}
