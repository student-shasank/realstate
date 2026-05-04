/**
 * Property Detail API Response Mapper
 * Converts API JSON structure to component expected structure
 * 
 * Usage in Redux slice or component:
 * const transformedData = mapPropertyDetailData(apiResponse);
 */

export const mapPropertyDetailData = (apiData) => {
  if (!apiData) return {};

  // Extract payment plan info
  const paymentPlan = apiData.new_payment_plans?.[0];
  const paymentSteps = paymentPlan?.milestones?.map((m) => ({
    label: m.milestone_title,
    percent: parseInt(m.percentage) || 0,
  })) || [];

  // Parse beds from string format "0,1,1.5,2" to array
  const bedsArray = apiData.beds
    ? apiData.beds.split(",").map((b) => b.trim())
    : [];

  // Transform typical units to unitTypes format
  const unitTypes = apiData.typical_units?.map((unit) => ({
    bedrooms: unit.bedroom,
    bathrooms: null,
    sqFt: unit.lowest_area || unit.highest_area,
    startingPrice: unit.lowest_price,
    price: unit.lowest_price,
    type: `${unit.bedroom} BR`,
  })) || [];

  // Transform facilities/amenities
  const amenitiesArray =
    apiData.amenities_and_features?.features_names || [];

  // Get agent/sales executive info
  const salesExec = apiData.sales_executives?.[0];
  const agent = {
    name: salesExec?.name || apiData.developer_name || "—",
    email: salesExec?.email || apiData.developer_email || "—",
    phone: salesExec?.phone || apiData.developer_phone || "—",
    profileImage:
      salesExec?.image ||
      apiData.developer_image ||
      "https://via.placeholder.com/150",
  };

  // Get location data
  const location = {
    address: apiData.location || "—",
    country:
      apiData.country_data?.name || "United Arab Emirates",
    city: apiData.city_data?.name || "Dubai",
    community: apiData.district_data?.[0]?.name || "Dubai Industrial City",
    communityImage: apiData.images?.general?.[0] || "—",
    coordinates: apiData.latlong
      ? apiData.latlong.split(",").map((coord) => parseFloat(coord.trim()))
      : [24.87269532250173, 55.04313647981814],
  };

  // Get images array
  const images = apiData.all_images || [
    apiData.images?.feature || "https://via.placeholder.com/800x600",
  ];

  // Building info
  const buildingInfo = {
    buildingName: apiData.developer_name || "—",
    yearOfCompletion: apiData.expected_completion_date
      ? new Date(apiData.expected_completion_date).getFullYear()
      : "—",
    totalFloors: "—",
    swimmingPools: amenitiesArray.includes("Swimming Pool")
      ? "Yes"
      : "—",
    totalParkingSpaces: apiData.parkings?.[0]?.data?.[0]
      ? Object.values(apiData.parkings[0].data[0])[0]
      : "1 parking",
    totalBuildingArea: "—",
    elevators: "—",
  };

  // Regulatory info
  const regulatoryInfo = {
    permitNumber: apiData.adm_number || "N/A",
    zoneName: apiData.district_data?.[0]?.name || "N/A",
    rera: "Approved",
    brn: "Approved",
    registeredAgency: "RTO",
  };

  // Investment insights
  const investmentInsights = {
    rentalYield: "—",
    priceTrend: "—",
    pricePerSqFt: "—",
  };

  // Community info
  const community = {
    title: apiData.district_data?.[0]?.name || "Dubai Industrial City",
    slug: apiData.slug,
    marketSupply: {
      image: apiData.images?.general?.[0] || "—",
    },
  };

  // Floor plans (if available in API, otherwise return empty)
  const floorPlans = apiData.floor_plans || [];

  // Project info
  const projectInfo = {
    name: apiData.title,
    developer: apiData.developer_name,
    completion: apiData.expected_completion_date
      ? new Date(apiData.expected_completion_date).getFullYear()
      : "—",
  };

  // Completion status based on project_completed flag
  const completionStatus = apiData.project_status || "Off-Plan";

  // Property info rows (additional info)
  const info = [
    { label: "Project Status", value: completionStatus },
    { label: "Expected Completion", value: apiData.expected_completion_date || "—" },
    { label: "Developer", value: apiData.developer_name || "—" },
    { label: "District", value: apiData.district_data?.[0]?.name || "—" },
    { label: "Total Properties", value: apiData.total_properties || "—" },
  ];

  // Overview stats
  const overview = {
    bedrooms: bedsArray[0] || "—",
    bathrooms: apiData.baths || "—",
    garage: "1",
    yearBuilt: apiData.expected_completion_date
      ? new Date(apiData.expected_completion_date).getFullYear()
      : "—",
    areaSize: `${apiData.area_start} Sq Ft`,
  };

  // Construct final mapped object
  const mapped = {
    // Basic info
    id: apiData.id,
    slug: apiData.slug,
    title: apiData.title,
    description: apiData.description,
    referenceNo: apiData.slug,
    price: apiData.price_start,
    price_start: apiData.price_start,
    price_end: apiData.price_end,
    currency: apiData.currency || "AED",
    types: apiData.types || apiData.property_types?.[0] || "Apartments",
    type: apiData.types || apiData.property_types?.[0] || "Apartments",

    // Status & dates
    completionStatus: completionStatus,
    propertyStatus: completionStatus,
    listingStatus: apiData.project_status || "Available",
    availability: "—",
    isFeatured: apiData.is_featured || false,
    handoverDate: apiData.expected_completion_date,
    listingDate: apiData.created_at,
    yearBuilt: apiData.expected_completion_date
      ? new Date(apiData.expected_completion_date).getFullYear()
      : "—",

    // Dimensions & specs
    bedrooms: bedsArray[0] || "—",
    bathrooms: apiData.baths || "—",
    rooms: "—",
    garage: "1",
    builtUpArea: apiData.area_start,
    totalBuildingArea: apiData.area_end,
    sqft: apiData.area_start,

    // Features
    furnishing: "Modern",
    features: amenitiesArray,
    amenities: amenitiesArray,

    // Media
    images: images,
    videos: [],
    youtubeVideoId: null,
    brochureUrl: apiData.attachments?.[0]?.attachment_url || "#",

    // Developer/Builder
    developer: apiData.developer_name,
    builder: apiData.developer_name,
    ownership: "Freehold",

    // Structured data
    agent: agent,
    location: location,
    buildingInfo: buildingInfo,
    regulatoryInfo: regulatoryInfo,
    investmentInsights: investmentInsights,
    community: community,
    projectInfo: projectInfo,
    unitTypes: unitTypes,
    floorPlans: floorPlans,
    paymentPlan: {
      planName: paymentPlan?.title || "Payment Plan",
      steps: paymentSteps,
    },
    overview: overview,
    info: info,

    // Additional
    serviceCharges: "—",
    pricePerSqFt: "—",
    rating: null,
    reviews: [],
    purpose: "Residential",

    // Raw API data (backup)
    _rawData: apiData,
  };

  return mapped;
};

// Alternative: If you're using Redux, create a selector that maps the data
export const createSelectMappedPropertyDetail = () => {
  return (state) => {
    const rawProperty = state.listingDetail?.listing;
    return mapPropertyDetailData(rawProperty);
  };
};