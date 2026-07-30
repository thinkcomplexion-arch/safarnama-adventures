import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { storage } from "@/firebase";

export async function uploadItineraryImage(
  file: File,
  path: string
) {
  const storageRef = ref(
    storage,
    path
  );

  await uploadBytes(
    storageRef,
    file
  );

  const url = await getDownloadURL(
    storageRef
  );

  return url;
}
