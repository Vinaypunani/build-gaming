export async function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');

    fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url) {
          resolve(data.secure_url);
        } else {
          reject(new Error('Failed to upload image'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function deleteImage(imageUrl: string): Promise<void> {
  if (!imageUrl) return;

  try {
    // Extract public_id from the Cloudinary URL
    const urlParts = imageUrl.split('/');
    const publicId = urlParts[urlParts.length - 1].split('.')[0];

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = require('crypto')
      .createHash('sha1')
      .update(`public_id=${publicId}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`)
      .digest('hex');

    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('timestamp', timestamp.toString());
    formData.append('api_key', process.env.CLOUDINARY_API_KEY || '');
    formData.append('signature', signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete image from Cloudinary');
    }
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
} 