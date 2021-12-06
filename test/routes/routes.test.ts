import { expect } from 'chai';
import faker from "faker";
import request from 'supertest';
import applyRoutes from '../../src/routes';
import createExpressApp from '../../src/server/create.express.app';
import * as queue from "../../src/services/services.queue";

describe('Rest endpoints', () => {

    afterEach(() => {
        queue.clearMessages();
    });
    
    let app = createExpressApp();

    app = applyRoutes(app);


    it('should produce message',  async () => {
        const res = await request(app).post('/api/produce').send({text:"new message"})
        expect(res.status).to.equal(201)
        expect(res.body.text).to.equal("new message")
    })

    it('should consume messages', async () => {
        await request(app).post('/api/produce').send({ text: faker.lorem.paragraphs() })
        await request(app).post('/api/produce').send({ text: faker.lorem.paragraphs() })
        await request(app).post('/api/produce').send({ text: faker.lorem.paragraphs() })

        let res = await request(app).get('/api/consume').query({ limit: 1 })
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(1)


        res = await request(app).get('/api/consume').query({ limit: 2 })
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(2)
        
    });
    it('should produce, consume and delete message', async () => {
        let res = await request(app).post('/api/produce').send({text:"new message"})
        expect(res.status).to.equal(201)
        expect(res.body.text).to.equal("new message")

        res = await request(app).get('/api/consume').query({ limit: 10 })
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(1)
        expect(res.body[0].text).to.equal("new message")

        const id  = res.body[0].id

        res = await request(app).get(`/api/status/${id}`)
        expect(res.status).to.equal(200)
        expect(res.body.completed).to.equal(false)


        res = await request(app).delete(`/api/completed/${id}`)
        expect(res.status).to.equal(204)


        res = await request(app).get(`/api/status/${id}`)
        expect(res.status).to.equal(200)
        expect(res.body.completed).to.equal(true)
        
    });
});
