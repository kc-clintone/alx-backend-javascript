import { uploadPhoto, createUser } from './utils.js';

export default async function asyncUploadUser() {
  try {
    const pic = await uploadPhoto();
    const usr = await createUser();
    return {
      pic,
      usr,
    };
  } catch (error) {
    return {
      pic: null,
      usr: null,
    };
  }
}
