import FormAdd from './FormAdd';

/**
 * @class FormEdit
 */
export default class FormEdit extends FormAdd {
  constructor() {
    super();
    this.className = 'form-edit';
    this.title = 'Изменить Тикет';
  }
}
