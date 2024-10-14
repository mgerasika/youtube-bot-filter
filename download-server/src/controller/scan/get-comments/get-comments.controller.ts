import { IExpressRequest, IExpressResponse, app } from '@server/express-app';
import { API_URL } from '@server/constants/api-url.constant';
import { getCommentsAsync, IGetCommentsBody } from './get-comments.service';

interface IRequest extends IExpressRequest {
    body: IGetCommentsBody;
}

interface IResponse extends IExpressResponse<void, void> {}

app.post(API_URL.api.scan.getComments.toString(), async (req: IRequest, res: IResponse) => {
    const [data, error] = await getCommentsAsync(req.body);
    if (error) {
        return res.status(400).send(error);
    }
    return res.send(data);
});