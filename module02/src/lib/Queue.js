import Bee from 'bee-queue';
import CancelationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancelationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('fail', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
