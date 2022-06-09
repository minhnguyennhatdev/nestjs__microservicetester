import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('BOOKS_SERVICE') private readonly client: ClientProxy) {}

  @Get()
  getHello() {
    return this.client.send('hello', 'Hello!');
  }

  @Get('/books')
  getBooks() {
    return this.client.send('get_books', {});
  }
}
