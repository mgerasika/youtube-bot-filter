import { IExpressRequest, IExpressResponse, app } from '@server/express-app';

import { IScanChannelInfoBody } from './scan-channel-info.service';
import { allServices } from '@server/controller/all-services';
import { API_URL } from '@server/api-url.constant';

interface IRequest extends IExpressRequest {
    body: IScanChannelInfoBody;
}

interface IResponse extends IExpressResponse<void, void> {}

app.post(API_URL.api.scan.scanChannelInfo.toString(), async (req: IRequest, res: IResponse) => {
    const [data, error] = await allServices.scan.scanChannelInfoAsync(req.body);
    if (error) {
        return res.status(400).send(error);
    }
    
   
    return res.send(data);
});
