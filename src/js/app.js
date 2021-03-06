import Elements from './Elements';
import Tickets from './Tickets';

const elements = new Elements();

const tickets = new Tickets(elements);
tickets.init();
