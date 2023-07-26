import MemberModel from '@/models/member/member.model';
import { NextApiRequest, NextApiResponse } from 'next';
import BadReqError from './error/bad_requst_error';

async function add(req: NextApiRequest, res: NextApiResponse) {
  const { uid, email, displayName, photoURL } = req.body;
  if (uid === undefined || uid === null) {
    throw new BadReqError('ui가 누락되었습니다.');
  }
  if (email === undefined || email === null) {
    throw new BadReqError('email이 누락되었습니다.');
  }
  const addResult = await MemberModel.add({ uid, email, displayName, photoURL });

  if (addResult.result === true) {
    return res.status(200).json(addResult);
  }
  res.status(500).json(addResult);
}

const MemberCtrl = {
  add,
};

export default MemberCtrl;
