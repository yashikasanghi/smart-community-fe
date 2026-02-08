import { uploadImage } from "@/constants/api-end-points";
import { issueApi } from "./api";

type UploadImagePayload = {
  uri: string;
  type?: string;
  name?: string;
};

export const uploadIssueImage = async (
  issueId: string,
  image: UploadImagePayload,
) => {
  const formData = new FormData();
  const filename = image.name ?? image.uri.split("/").pop() ?? "issue.jpg";
  const contentType = image.type ?? "image/jpeg";

  const isFileUri =
    image.uri.startsWith("file://") || image.uri.startsWith("content://");

  if (isFileUri) {
    formData.append("image", {
      uri: image.uri,
      name: filename,
      type: contentType,
    } as any);
  } else {
    const response = await fetch(image.uri);
    const blob = await response.blob();
    formData.append("image", blob as any, filename);
  }

  await issueApi.post(`${uploadImage}/${issueId}/images`, formData);
};
