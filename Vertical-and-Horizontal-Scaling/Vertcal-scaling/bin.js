import { app } from './index.js';
import  os  from 'os';
import cluster from 'cluster';
const hostname = os.hostname();
const platform = os.platform();
const arch = os.arch();
const osNumberOfCores = os.cpus().length;
const osTotalMemory = os.totalmem();
const osFreeMemory = os.freemem();

if(cluster.isPrimary){
  const numCores = os.cpus().length;
  console.log(`Primary clustre setting up ${numCores} workers...`);
  console.log(`process id of primary cluster is ${process.pid}`);

  for(let i = 0; i < numCores; i++){
    console.log(`Forking worker number ${i + 1}`);
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal)=>{
    console.log(`worker ${worker.process.pid} died`);
    console.log("Starting a new worker");
    cluster.fork();

    cluster.on("listening",(worker, address)=>{
      console.log(`worker ${worker.process.pid} is listenting on port ${address.port}`)
    })
  })
} else{
  app.listen(3000, ()=>{
  console.log("Server is running on port 3000");
})
}