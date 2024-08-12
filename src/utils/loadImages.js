export function loadImagesFromFolder(folderPath) {
  const images = {};
  const context = require.context(folderPath, false, /\.(png|jpe?g|svg)$/);

  context.keys().forEach((image) => {
    const key = image.replace('./', '');
    images[key] = context(image);
  });

  return images;
}
