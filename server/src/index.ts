require('module-alias/register');
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env

import { ENV } from '@server/env';
import { rabbitMQ_createConnectionAsync, rabbitMQ_subscribeAsync } from '@common/utils/rabbit-mq';
import { allServices } from './controller/all-services';
import { app } from './express-app';
import { typeOrmAsync } from './sql/type-orm-async.util';
import { connectToRedisAsync } from '@common/utils/redis';

export * from './controller/all-controllers';

console.log('ENV=', ENV);

app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
    res.send(JSON.stringify(allServices, null, 2));
});

if (process.env.NODE_ENV === 'development') {
    // sync database
    typeOrmAsync(() => Promise.resolve(['']));
}

const port = process.env.PORT || 8007;
if (ENV.rabbit_mq_url) {
    // rabbitMQ_subscribeAsync((data) => {
    //     if (data.setupBody) {
    //         console.log('Recived here')
    //     }
    //     return Promise.resolve('empty');
    // });

    
    rabbitMQ_createConnectionAsync({channelName: ENV.rabbit_mq_channel_name, rabbit_mq_url: ENV.rabbit_mq_url}); 
    connectToRedisAsync(ENV.redis_url || '').then(async redis => {
        console.log('Connected to Redis');
    });
}
// console.log('ENV = ', ENV);
console.log('port',  port)
const server = app.listen(port, function () {
    console.log('Server started on port ' + port);
});
