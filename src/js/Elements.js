/* eslint-disable prefer-destructuring */

import FormAdd from './Forms/FormAdd';
import FormEdit from './Forms/FormEdit';
import FormDelete from './Forms/FormDelete';
import Item from './Item';
import Content from './Content';

/**
 * @class Elements
 */
export default class Elements {
  constructor() {
    this.item = new Item();
    this.content = new Content().getContent();
    this.formAdd = new FormAdd().getContent();
    this.formEdit = new FormEdit().getContent();
    this.formDelete = new FormDelete().getContent();
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
    this.addFormWrapper();
    // this.addItem();
  }

  /**
   * Add container
   */
  addContainer() {
    this.container = document.createElement('div');
    this.container.classList.add('container');
  }

  /**
   * Add form wrapper for background
   */
  addFormWrapper() {
    this.formWrapper = document.createElement('div');
    this.formWrapper.classList.add('form-wrapper');
  }

  /**
   * Show formAdd
   */
  showModalAdd() {
    this.body.insertAdjacentElement('afterbegin', this.formWrapper);

    this.formWrapper.classList.add('form-active');
    this.formWrapper.appendChild(this.formAdd);

    const form = document.forms[0];
    const fields = form.querySelectorAll('[id^=field-');

    [...fields].forEach((field) => {
      field.classList.remove('field-invalid');
    });
    this.formAdd.querySelector('.field-name').focus();
  }

  /**
   * Hide all forms
   */
  hideModal() {
    this.formWrapper.classList.remove('form-active');
    this.formWrapper.innerHTML = '';
    this.body.removeChild(this.formWrapper);
  }

  /**
   * Reset items - container for ticket
   */
  resetTickets() {
    const items = this.content.querySelector('.items');
    items.innerHTML = '';
  }

  /**
   * Add ticket to page
   *
   * @param {object} ticket - ticket
   */
  addItem(ticket) {
    const items = this.content.querySelector('.items');
    items.appendChild(this.item.getItem(ticket));
  }

  /**
   * Close all open descriptions
   */
  resetItemDescription() {
    const descriptions = this.content.getElementsByClassName('item-description');
    [...descriptions].forEach((e) => e.classList.remove('description-active'));
  }

  /**
   * Show formEdit
   *
   * @param {object} ticket - ticket
   */
  showModalEdit(ticket) {
    this.body.insertAdjacentElement('afterbegin', this.formWrapper);

    this.formWrapper.classList.add('form-active');
    this.formWrapper.appendChild(this.formEdit);

    const form = document.forms[0];
    const fields = form.querySelectorAll('[id^=field-');

    [...fields].forEach((field) => {
      field.classList.remove('field-invalid');
    });

    form.querySelector('.field-name').value = ticket.name;
    form.querySelector('.field-description').value = ticket.description;
  }

  /**
   * Show formDelete
   *
   * @param {number} id - ticket id
   */
  showModalDelete(id) {
    this.body.insertAdjacentElement('afterbegin', this.formWrapper);

    this.formWrapper.classList.add('form-active');
    this.formWrapper.appendChild(this.formDelete);
    this.formDelete.querySelector('.field-delete').value = id;
  }
}
