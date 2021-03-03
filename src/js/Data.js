import StorageStandard from './StorageStandard';
import StreamsStandard from './StreamsStandard';
import Request from './XMLHttpRequestStandard';

const storageStandard = new StorageStandard();
const streamsStandard = new StreamsStandard();
const request = new Request();

/**
 * @class Data
 */
export default class Data {
  constructor() {
    this.storageStandard = {
      url: storageStandard.url,
      name: 'Storage Standard',
    };
    this.streamsStandard = {
      url: streamsStandard.url,
      name: 'Streams Standard',
    };
    this.xMLHttpRequestStandard = {
      url: request.url,
      name: 'XMLHttpRequest Standard',
    };
  }
}
