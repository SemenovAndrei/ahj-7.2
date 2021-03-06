import FormAdd from './FormAdd';

/**
 * @class FormDelete
 */
export default class FormDelete extends FormAdd {
  constructor() {
    super();
    this.className = 'form-delete';
  }

  /**
   * Add marker to this.content
   */
  getMarkup() {
    this.content.innerHTML = `
    <h3 class="form-title">Удалить Тикет</h3>
    <div class="form-alarm">Вы уверены что хотите удалить тикет? Это действие необратимо.</div>
    <input class="field-delete" id="field-delete" name="delete" type="hidden">
    <div class="form-controls">
      <button type="reset" class="btn btn-cancel">Отмена</button>
      <button class="btn btn-confirm">Ok</button>
    </div>
    `;
  }
}
