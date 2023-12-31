import BadReqError from './badrequest_error';

export default function checkSupportMethod(supportMethod: string[], method?: string): void {
  if (supportMethod.indexOf(method!) === -1) {
    throw new BadReqError('지원하지 않는 method 입니다.');
  }
}
