import request from 'supertest';
import createExpressApp from '../../src/server/create.express.app';

describe('express app checks', () => {
    const app = createExpressApp();

    it('should send back a 200', function (done) {
        request(app).get('/').expect(200, done());
    });
});
