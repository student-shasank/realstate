/**
 * Image Extraction Utility
 * API se sab images ko properly extract aur organize karta hai
 */

export const extractAllImages = (apiData) => {
  if (!apiData) return {
    allImages: [],
    featureImage: null,
    galleryImages: [],
    categoryImages: {},
  };

  // Method 1: all_images array (simplest, preferred)
  const allImages = apiData.all_images || [];

  // Method 2: images object with categories
  const imagesObj = apiData.images || {};

  // Feature/main image
  const featureImage = imagesObj.feature || allImages?.[0] || null;

  // Gallery images (exclude feature if it's first)
  let galleryImages = [];
  if (allImages.length > 0) {
    galleryImages = allImages;
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