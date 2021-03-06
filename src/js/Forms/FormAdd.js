/**
 * @class Content
 */
export default class FormAdd {
  constructor() {
    this.content = null;
    this.className = 'form-add';
  }

  /**
   * Add board to this
   */
  addContent() {
    this.content = document.createElement('form');
    this.content.classList.add(this.className);
    this.getMarkup();
  }

  /**
   * Add marker to this.content
   */
  getMarkup() {
    this.content.innerHTML = `
    <h3 class="form-title">Добавить Тикет</h3>
    <label for="field-name">Краткое Описание</label>
    <input class="field-name" id="field-name" name="name">
    <label for="field-description">Подробное Описание</label>
    <textarea class="field-description" id="field-description" name="description" rows="5"></textarea>
    <div class="form-controls">
      <button type="reset" class="btn btn-cancel">Отмена</button>
      <button class="btn btn-confirm">Ok</button>
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
