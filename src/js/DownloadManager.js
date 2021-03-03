/**
 * @class DownloadManager
 */
export default class DownloadManager {
  constructor(elements) {
    this.elements = elements;
    this.totalDownloaded = +0;
  }

  /**
   * init
   */
  init() {
    this.elements.init();
    this.addListeners();
    this.showDownloaded();
  }

  /**
   * Add Listeners
   */
  addListeners() {
    this.elements.content.addEventListener('click', this.downloadFile.bind(this));
  }

  /**
   * Handler event click
   *
   * @param {event} event
   */
  downloadFile(event) {
    if (!event.target.closest('.item-link')) {
      return;
    }
    // event.preventDefault();

    const recipient = event.target.closest('.item-link').querySelector('.link');
    // const a = document.createElement('a');
    // a.download = recipient.download;
    // a.href = recipient.href;
    // a.rel = 'noopener';
    // a.dispatchEvent(new MouseEvent('click'));

    this.totalDownloaded = (+this.totalDownloaded + +recipient.dataset.size).toFixed(2);
    this.showDownloaded();
  }

  /**
   * Show this.totalDownloaded on page
   */
  showDownloaded() {
    const downloaded = this.elements.container.querySelector('.downloaded');
    downloaded.textContent = `You've already downloaded: ${this.totalDownloaded} Mb`;
  }
}
