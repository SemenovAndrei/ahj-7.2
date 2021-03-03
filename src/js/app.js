import Data from './Data';
import Item from './Item';
import Content from './Content';
import Elements from './Elements';
import DownloadManager from './DownloadManager';

const content = new Content();

const item = new Item();

const data = new Data();

const elements = new Elements(content, item, data);

const downloadManager = new DownloadManager(elements);
downloadManager.init();
