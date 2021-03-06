import Item from '../Item';
import Content from '../Content';
import Elements from '../Elements';
import Tickets from '../Tickets';

const content = new Content();

const item = new Item();

const elements = new Elements(content, item);

const tickets = new Tickets(elements);
tickets.init();

test('create content', () => {
  expect(tickets.elements.content.classList.contains('content')).toBe(true);
});
