import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  fileUploader: f({
    image: { maxFileSize: '4MB' },
    pdf: { maxFileSize: '4MB' },
  })
    .middleware(async () => {
      return { uploadMetadata: 'someValue' };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload metadata:', metadata.uploadMetadata);
      console.log('file url', file.url);
      // Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadInfo: metadata.uploadMetadata };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
