import { InAuthUser } from '@/models/in_auth_user';
import FirebaseAdmin from '../firebase_admin';

const MEMBER_COLLECTION = 'members';
const SCREEN_NAME_COLLECTION = 'screen_names';

type AddResult = { result: true; id: string } | { result: false; message: string };

async function add({ uid, email, displayName, photoURL }: InAuthUser): Promise<AddResult> {
  try {
    const screenName = (email as string).replace('@gmail.com', '');
    const addResult = await FirebaseAdmin.getInstance().Firebase.runTransaction(async (transaction: any) => {
      const memberRef = FirebaseAdmin.getInstance().Firebase.collection('members').doc(uid);
      const screenNameRef = FirebaseAdmin.getInstance().Firebase.collection('screen_names').doc(screenName);
      const memberDoc = await transaction.get(memberRef);
      if (memberDoc.exists) {
        return false;
      }
      const addData = {
        uid,
        email,
        displayName: displayName ?? '',
        photoURL: photoURL ?? '',
      };
      await transaction.set(memberRef, addData);
      await transaction.set(screenNameRef, addData);
      return true;
    });
    if (addResult === false) {
      return { result: true, id: uid };
    }
    return { result: true, id: uid };
  } catch (err) {
    console.error(err);
    return { result: false, message: '서버에러' };
  }
}

async function findByScreenName(screenName: string): Promise<InAuthUser | null> {
  const memberRef = FirebaseAdmin.getInstance().Firebase.collection(SCREEN_NAME_COLLECTION).doc(screenName);

  const memberDoc = await memberRef.get();

  if (memberDoc.exists === false) {
    return null;
  }
  const mappingData = memberDoc.data() as InAuthUser;
  return mappingData;
}
const MemberModel = {
  add,
  findByScreenName,
};
export default MemberModel;
