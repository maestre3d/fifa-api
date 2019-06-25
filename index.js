
// Libs 
const cluster = require('cluster');
const mongoose = require('mongoose');
const app = require('./app');

// Var
const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;

if (cluster.isMaster) {
        // Count the machine's CPUs
        const CPU_COUNT = require('os').cpus().length;

        // Create a worker for each CPU
        for (let i = 0; i < CPU_COUNT; i += 1) {
            cluster.fork();
        }
    
        // Listen for dying workers
        cluster.on('exit', function (worker) {
            // Replace the dead worker,
            // we're not sentimental
            console.log('Worker %d died :(', worker.id);
            cluster.fork();
        });    
} else {
    mongoose.connect('mongodb://localhost:27017/fifa' , {useNewUrlParser: true}, (err) => {
        err ? console.log('Database server connection failed') : app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    });
}