/* eslint-disable no-console */
import { uploadPhoto, createUser } from './utils';

export default function handleProfileSignup() {
  const pic = uploadPhoto();
  const usr = createUser();

  return Promise.all([pic, usr]).then((res) => {
    console.log(`${res[0].body} ${res[1].firstName} ${res[1].lastName}`);
  })
    .catch(() => { console.log('Signup system offline'); });
}
