import { expect } from "chai";
import faker from "faker";
import * as queue from "../../src/services/queue";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createBatchMessages = (count: number) => {
  return Array(count)
    .fill("")
    .map(() => queue.produce(faker.lorem.paragraphs()));
};

describe("queue", () => {
  afterEach(() => {
    queue.clearMessages();
    queue.setAvailabilityPeriod(60000);
  });

  it("should produce a message", () => {
    queue.produce("Do something for me");
    const messages = queue.getAllMessage();
    expect(messages[0].text).to.equal("Do something for me");
  });

  it("should produce batch messages", () => {
    createBatchMessages(20);
    const messages = queue.getAllMessage();
    expect(messages.length).to.equal(20);
  });

  it("should clear messages", () => {
    createBatchMessages(20);
    queue.clearMessages();
    const messages = queue.getAllMessage();
    expect(messages.length).to.equal(0);
  });

  it("should delete message", () => {
    createBatchMessages(20);
    const random = Math.floor(Math.random() * 20);
    let messages = queue.getAllMessage();
    const message = messages[random];
    expect(messages[random]).to.equal(message);

    /**
     * delete and check if not exist
     */
    queue.deleteMessage(message.id);
    messages = queue.getAllMessage();
    expect(messages.length).to.equal(19);
    expect(messages[random]).to.not.equal(message);
  });

  it("should consume only given count of available message", async () => {
    queue.setAvailabilityPeriod(10);

    createBatchMessages(20);

    let messages = queue.consume(10);
    expect(messages.length).to.equal(10);
  });

  it("should consume available message", async () => {
    queue.setAvailabilityPeriod(10);

    createBatchMessages(20);

    let messages = queue.consume(20);
    expect(messages.length).to.equal(20);

    /**
     * next consume should return no messages
     */
    messages = queue.consume(20);
    expect(messages.length).to.equal(0);

    /**
     * delay more than availabilityPeriod for messages to become available
     */
    await delay(15);

    /**
     * next consume should return all messages
     */
    messages = queue.consume(20);
    expect(messages.length).to.equal(20);
  });
});
