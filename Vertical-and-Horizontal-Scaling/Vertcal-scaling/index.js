import express from 'express';
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
   const app = express();
   console.log(`Worker started with pid ${process.pid}`);

   app.get("/", (req, res)=>{
    const { name } = req.query;
    res.send(`Hello ${name} from Vertical Scaling Server on host ${hostname}, platform ${platform}, architecture ${arch}, with ${osNumberOfCores} CPU cores, total memory ${osTotalMemory} bytes, and free memory ${osFreeMemory} bytes, process id ${process.pid}`);
})

 app.get("/api/:n", (req, res)=>{
  const n = parseInt(req.params.n);
  
  if(n > 50000000) n = 50000000; //Limit n to prevent server overload

  let sum = 0;
  for(let i = 1; i <= n; i++){
    sum += i;
  }

  res.send(`Sum of first ${n} natural numbers is ${sum}, calculated by process id ${process.pid}`);
 })

app.listen(3000, ()=>{
  console.log("Server is running on port 3000");
})


}





