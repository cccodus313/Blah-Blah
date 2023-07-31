import CustomServerError from '@/controllers/error/custom_server_error';
import { firestore } from 'firebase-admin';
import FirebaseAdmin from '../firebase_admin';
import { InMessage, InMessageServer } from './in_message';

const MEMBER_COLLECTION = 'members';
const MESSAGE_COLLECTION = 'messages';
const SCREEN_NAME_COLLECTION = 'screen_names';

const { Firestore } = FirebaseAdmin.getInstance();

async function post({
  uid,
  message,
  author,
}: {
  uid: string;
  message: string;
  author?: {
    displayName: string;
    photoURL?: string;
  };
}) {
  const memberRef = FirebaseAdmin.getInstance().Firestore.collection(MEMBER_COLLECTION).doc(uid);
  const listData = await Firestore.runTransaction(async (transaction) => {
    const memberDoc = await transaction.get(memberRef);
    if (memberDoc.exists === false) {
      throw new CustomServerError({ statusCode: 400, message: '존재하지 않는 사용자' });
    }
    const newMessageRef = memberRef.collection(MEMBER_COLLECTION).doc();
    const newMessageBody: {
      message: string;
      createAt: firestore.FieldValue;
      author?: {
        displayName: string;
        photoURL?: string;
      };
    } = {
      message,
      createAt: firestore.FieldValue.serverTimestamp(),
    };
    if (author !== undefined) {
      newMessageBody.author = author;
    }
    await transaction.set(newMessageRef, newMessageBody);
  });
}

async function list({ uid }: { uid: string }) {
  const memberRef = FirebaseAdmin.getInstance().Firestore.collection(MEMBER_COLLECTION).doc(uid);
  const listData = await Firestore.runTransaction(async (transaction) => {
    const memberDoc = await transaction.get(memberRef);
    if (memberDoc.exists === false) {
      throw new CustomServerError({ statusCode: 400, message: '존재하지 않는 사용자' });
    }
    const messageCol = memberRef.collection(MESSAGE_COLLECTION);
    const messageColDoc = await transaction.get(messageCol);
    const data = messageColDoc.docs.map((mv) => {
      const docData = mv.data() as Omit<InMessageServer, 'id'>;
      const returnData = {
        ...docData,
        id: mv.id,
        crateAt: docData.createAt.toDate().toISOString(),
        replyAt: docData.replyAt ? docData.replyAt.toDate().toISOString() : undefined,
      } as unknown as InMessage;
      return returnData;
    });
    return data;
  });
  return listData;
}
const MessageModel = {
  post,
  list,
};

export default MessageModel;
