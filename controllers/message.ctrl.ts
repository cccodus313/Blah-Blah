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
async function list(req: NextApiRequest, res: NextApiResponse) {
  const { uid } = req.body;

  if (uid === undefined) {
    throw new BadReqError('uid누락');
  }
  const uidToStr = Array.isArray(uid) ? uid[0] : uid;
  const listResp = await MessageModel.list({ uid: uidToStr });
  return res.status(200).json(listResp);
}

const MessageCtrl = {
  post,
  list,
};

export default MessageCtrl;
