/**
 * Image Extraction Utility
 * API se sab images ko properly extract aur organize karta hai
 *
 * Handles THREE possible shapes now:
 *  1. apiData.all_images        -> flat array of URL strings (off-plan docs)
 *  2. apiData.images (ARRAY)    -> flat array of URL strings (Ready listings,
 *                                   e.g. Cloudinary URLs saved by createListing)
 *  3. apiData.images (OBJECT)   -> { feature, general[], exterior[], interior[],
 *                                    lobby[], other[] } (off-plan docs)
 */

export const extractAllImages = (apiData) => {
  if (!apiData) return {
    allImages: [],
    featureImage: null,
    galleryImages: [],
    categoryImages: {},
    totalImages: 0,
  };

  // Method 1: all_images flat array (off-plan docs)
  // Method 1b: apiData.images IS a flat array itself (Ready listings —
  // this is the shape that was falling through before: `imagesObj.feature`
  // etc. silently returned undefined because you can't read object-style
  // keys off a plain string array).
  const flatImages =
    Array.isArray(apiData.all_images) && apiData.all_images.length > 0
      ? apiData.all_images
      : Array.isArray(apiData.images) && apiData.images.length > 0
      ? apiData.images
      : [];

  // Method 2: images object with categories — only treat apiData.images as
  // this "object" shape when it's actually an object, not an array.
  const imagesObj =
    apiData.images && !Array.isArray(apiData.images) ? apiData.images : {};

  // Feature/main image
  const featureImage = imagesObj.feature || flatImages[0] || null;

  // Gallery images (exclude feature if it's first)
  let galleryImages = [];
  if (flatImages.length > 0) {
    galleryImages = flatImages;
  } else {
    // Fallback: combine all images from categories
    galleryImages = [
      imagesObj.feature,
      ...(imagesObj.general || []),
      ...(imagesObj.exterior || []),
      ...(imagesObj.interior || []),
      ...(imagesObj.lobby || []),
      ...(imagesObj.other || []),
    ].filter(Boolean);
  }

  // Category-wise images (for advanced use)
  const categoryImages = {
    feature: imagesObj.feature || null,
    general: imagesObj.general || [],
    exterior: imagesObj.exterior || [],
    interior: imagesObj.interior || [],
    lobby: imagesObj.lobby || [],
    other: imagesObj.other || [],
  };

  return {
    allImages: galleryImages,
    featureImage: featureImage,
    galleryImages: galleryImages,
    categoryImages: categoryImages,
    totalImages: galleryImages.length,
  };
};

/**
 * Get safe image URL with fallback
 */
export const getSafeImageUrl = (url, fallback = "https://via.placeholder.com/800x600") => {
  return url && typeof url === "string" ? url : fallback;
};

/**
 * Get nth image from gallery
 */
export const getImageByIndex = (images, index, fallback = "https://via.placeholder.com/800x600") => {
  if (!images || !Array.isArray(images)) return fallback;
  return images[index] || fallback;
};