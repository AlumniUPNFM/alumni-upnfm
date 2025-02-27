import { decode } from "base64-arraybuffer";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "./supabase-client";

export async function uploadImageBase64({
  base64,
  bucket,
  folder,
}: {
  base64: string;
  bucket: BUCKETS;
  folder: FOLDERS;
}) {
  const [, base64Image] = base64.split(",");
  const ArrayBufferImage = decode(base64Image);
  const uuid = uuidv4();

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`${folder}/${uuid}.jpeg`, ArrayBufferImage, {
      contentType: "image/jpeg",
      upsert: true,
    });

  console.log({ data });

  if (error) {
    throw new Error(error.message);
  }

  return data as IResponse;
}

export enum BUCKETS {
  UPN = "UPN",
}

export enum FOLDERS {
  USERS = "users",
}

export interface IResponse {
  path: string;
  id: string;
  fullPath: string;
}
