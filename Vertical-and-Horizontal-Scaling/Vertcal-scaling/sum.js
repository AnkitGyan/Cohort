import os from "os";
import cluster from "cluster";

const TOTAL = 1_000_000;
const numCPUs = os.cpus().length;

// ⏱️ start time (only once in master)
const startTime = process.hrtime.bigint();

if (cluster.isPrimary) {
  console.log(`Master PID: ${process.pid}`);
  console.log(`CPU cores: ${numCPUs}`);

  let completed = 0;
  let finalSum = 0;

  const range = Math.floor(TOTAL / numCPUs);

  for (let i = 0; i < numCPUs; i++) {
    const start = i * range + 1;
    const end = i === numCPUs - 1 ? TOTAL : (i + 1) * range;

    const worker = cluster.fork({
      START: start,
      END: end,
    });

    worker.on("message", (partialSum) => {
      finalSum += partialSum;
      completed++;

      if (completed === numCPUs) {
        const endTime = process.hrtime.bigint();
        const timeMs = Number(endTime - startTime) / 1_000_000;

        console.log("Final Sum:", finalSum);
        console.log(`Total Time: ${timeMs.toFixed(2)} ms`);

        process.exit();
      }
    });
  }

} else {
  const start = Number(process.env.START);
  const end = Number(process.env.END);

  let sum = 0;
  for (let i = start; i <= end; i++) {
    sum += i;
  }

  process.send(sum);
}