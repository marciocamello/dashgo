import { faker } from '@faker-js/faker';
import { ActiveModelSerializer, createServer, Factory, Model, Response } from 'miragejs';

export type User = {
    name: string;
    email: string;
    created_at: string;
}

export function makeServer() {
    const server = createServer({
        serializers: {
            application: ActiveModelSerializer,
        },

        models: {
            user: Model.extend<Partial<User>>({})
        },

        factories: {
            user: Factory.extend({
                name() {
                    return faker.name.findName();
                },
                email() {
                    return faker.internet.email().toLowerCase()
                },
                created_at() {
                    return faker.date.recent(10);
                }
            })
        },

        seeds(server) {
            server.createList('user', 200);
        },

        routes() {
            this.namespace = 'api';
            this.timing = 750;

            this.get('/users', function (schema, request) {
                const { page = 1, perPage = 10 } = request.queryParams;

                const total = schema.all('user').length;

                const pageStart = (Number(page) - 1) * Number(perPage);
                const pageEnd = pageStart + Number(perPage);

                const users = schema.all('user')
                    .models
                    .sort((a, b) => a.created_at < b.created_at ? 1 : -1)
                    .slice(pageStart, pageEnd);

                return new Response(
                    200,
                    { 'x-total-count': String(total) },
                    { users }
                )
            });

            this.get('/users/:id');
            this.post('/users');

            this.namespace = '';
            this.passthrough();
        }
    });

    return server;
}