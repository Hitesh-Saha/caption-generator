export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

export function getImageMimeType(dataUrlHeader: string): string | null {
  const match = dataUrlHeader.match(/^data:(image\/[a-zA-Z+]+);/);
  return match ? match[1] : null;
}

export function validateImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
}