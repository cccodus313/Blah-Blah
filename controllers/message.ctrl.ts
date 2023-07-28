import MessageModel from '@/models/message/message.model';
import { NextApiRequest, NextApiResponse } from 'next';
import BadReqError from './error/bad_requst_error';

async function post(req: NextApiRequest, res: NextApiResponse) {
  const { uid, message, author } = req.body;

  if (uid === undefined) {
    throw new BadReqError('uid누락');
  }
  if (message === undefined) {
    throw new BadReqError('message누락');
  }
  await MessageModel.post({ uid, message, author });
  return res.status(201).end();
}

const MessageCtrl = {
  post,
};

export default MessageCtrl;
