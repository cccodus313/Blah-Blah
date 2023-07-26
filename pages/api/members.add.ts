import checkSupportMethod from '@/controllers/error/check_support_method';
import MemberCtrl from '@/controllers/member.ctrl';
import { NextApiRequest, NextApiResponse } from 'next';
import handleError from '../../controllers/error/handle_error';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const supportMethod = ['POST'];
  try {
    checkSupportMethod(supportMethod, method);
    await MemberCtrl.add(req, res);
  } catch (err) {
    console.error(err);
    handleError(err, res);
  }
}
