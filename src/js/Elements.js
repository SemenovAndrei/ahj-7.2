import FormAdd from './Forms/FormAdd';
import Item from './Item';
import Content from './Content';

// const formAdd = new FormAdd();
// const content = new Content();
// const item = new Item();

/* eslint-disable prefer-destructuring */
/**
 * @class Elements
 */
export default class Elements {
  constructor() {
    this.item = new Item();
    this.content = new Content().getContent();
    this.formAdd = new FormAdd().getContent();
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

  addFormWrapper() {
    this.formWrapper = document.createElement('div');
    this.formWrapper.classList.add('form-wrapper');
  }

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

  hideModal() {
    this.formWrapper.classList.remove('form-active');
    this.formWrapper.innerHTML = '';
    this.body.removeChild(this.formWrapper);
  }

  resetTickets() {
    const items = this.content.querySelector('.items');
    items.innerHTML = '';
  }

  addItem(ticket) {
    const items = this.content.querySelector('.items');
    items.appendChild(this.item.getItem(ticket));
  }

  resetItemDescription() {
    const descriptions = this.content.getElementsByClassName('item-description');
    [...descriptions].forEach((e) => e.classList.remove('description-active'));
  }
}
