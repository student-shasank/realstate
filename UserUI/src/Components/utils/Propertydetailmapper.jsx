/**
 * Property Detail API Response Mapper
 * Converts API JSON structure to component expected structure
 *
 * Works for TWO source shapes now:
 *  1. Off-plan project docs (raw fields: beds, typical_units, new_payment_plans,
 *     sales_executives, district_data, latlong, parkings, ...)
 *  2. Manually-created "Ready" listings from ListingCreation.jsx (structured
 *     objects: agent, location, regulatoryInfo, buildingInfo, unitTypes,
 *     floorPlans, paymentPlan, investmentInsights, ...)
 *
 * Rule used everywhere below: prefer the structured Ready-listing field when
 * it exists, otherwise fall back to deriving it from the raw off-plan field.
 *
 * Usage in Redux slice or component:
 * const transformedData = mapPropertyDetailData(apiResponse);
 */

export const mapPropertyDetailData = (apiData) => {
  if (!apiData) return {};

  // ── Payment plan ────────────────────────────────────────────
  // Ready listing already stores { planName, downPayment, installmentPlan, steps }
  // in apiData.paymentPlan.steps as [{ label, percent }] — use it directly.
  // Off-plan docs only have new_payment_plans[0].milestones[] — derive from that.
  const offPlanPlan = apiData.new_payment_plans?.[0];
  const derivedSteps =
    offPlanPlan?.milestones?.map((m) => ({
      label: m.milestone_title,
      percent: parseInt(m.percentage) || 0,
    })) || [];

  const paymentPlan = {
    planName: apiData.paymentPlan?.planName || offPlanPlan?.title || "Payment Plan",
    downPayment: apiData.paymentPlan?.downPayment ?? "—",
    installmentPlan: apiData.paymentPlan?.installmentPlan || [],
    steps:
      apiData.paymentPlan?.steps && apiData.paymentPlan.steps.length > 0
        ? apiData.paymentPlan.steps
        : derivedSteps,
  };

  // ── Beds ────────────────────────────────────────────────────
  // Off-plan: comma string "0,1,1.5,2". Ready listing: plain number string.
  const bedsArray = apiData.beds
    ? String(apiData.beds).split(",").map((b) => b.trim())
    : [];

  // ── Unit types ──────────────────────────────────────────────
  // Ready listing already stores the exact shape the UI wants:
  // [{ bedrooms, sqFt, startingPrice, availability }]
  // Off-plan only has typical_units: [{ bedroom, lowest_area, highest_area, lowest_price }]
  const unitTypes =
    apiData.unitTypes && apiData.unitTypes.length > 0
      ? apiData.unitTypes.map((u) => ({
          bedrooms: u.bedrooms,
          bathrooms: u.bathrooms ?? null,
          sqFt: u.sqFt,
          startingPrice: u.startingPrice,
          price: u.startingPrice,
          availability: u.availability || "available",
          type: `${u.bedrooms} BR`,
        }))
      : apiData.typical_units?.map((unit) => ({
          bedrooms: unit.bedroom,
          bathrooms: null,
          sqFt: unit.lowest_area || unit.highest_area,
          startingPrice: unit.lowest_price,
          price: unit.lowest_price,
          type: `${unit.bedroom} BR`,
        })) || [];

  // ── Floor plans ─────────────────────────────────────────────
  // Ready listing: apiData.floorPlans (rich, user-entered).
  // Off-plan: apiData.floor_plans (rarely populated).
  const floorPlans =
    apiData.floorPlans && apiData.floorPlans.length > 0
      ? apiData.floorPlans
      : apiData.floor_plans || [];

  // ── Amenities / features ───────────────────────────────────
  // FIX: plain `||` chaining is unsafe here — an empty array `[]` is
  // truthy in JS, so `apiData.amenities || apiData.features || ...`
  // would stop at the FIRST field that exists, even if it's `[]`,
  // and never fall through to the field that actually has data
  // (e.g. Ready listings that save `amenities: []` by default, or
  // off-plan docs where `amenities_and_features.amenities` is `[]`
  // but `features_names` has the real list). Each candidate is now
  // checked explicitly for "is an array AND has items" before use —
  // same pattern already used below for `all_images`/`images`.
  const pickNonEmptyArray = (...candidates) => {
    for (const arr of candidates) {
      if (Array.isArray(arr) && arr.length > 0) return arr;
    }
    return [];
  };

  const amenitiesArray = pickNonEmptyArray(
    apiData.amenities,
    apiData.features,
    apiData.amenities_and_features?.features_names,
    apiData.amenities_and_features?.amenities,
  );

  // ── Facilities (amenities WITH icon/image) ─────────────────
  // Off-plan docs also send `facilities: [{ id, name, description, image }]`
  // which is what the UI needs when it renders amenity cards/icons instead
  // of a plain text list. The old mapper never surfaced this field at all,
  // so any component reading `mapped.facilities` got nothing even when the
  // API clearly had icons available. Ready listings may eventually send
  // their own `facilities` array in the same shape — prefer that if present,
  // otherwise use the off-plan `facilities`, and as a last resort build a
  // facilities-shaped list from the plain amenity names (no image).
  const facilitiesArray = (() => {
    const rawFacilities = pickNonEmptyArray(apiData.facilities);
    if (rawFacilities.length > 0) {
      return rawFacilities.map((f) => ({
        id: f.id,
        name: f.name,
        description: f.description || null,
        image: f.image || null,
      }));
    }
    return amenitiesArray.map((name, idx) => ({
      id: `amenity-${idx}`,
      name,
      description: null,
      image: null,
    }));
  })();

  // ── Agent / sales contact ──────────────────────────────────
  // Ready listing: apiData.agent (name, agency, phone, whatsapp, email, profileImage).
  // Off-plan: apiData.sales_executives[0], falling back to developer contact.
  const salesExec = apiData.sales_executives?.[0];
  const agent = {
    name: apiData.agent?.name || salesExec?.name || apiData.developer_name || "—",
    agency: apiData.agent?.agency || apiData.developer_name || "—",
    email: apiData.agent?.email || salesExec?.email || apiData.developer_email || "—",
    phone: apiData.agent?.phone || salesExec?.phone || apiData.developer_phone || "—",
    whatsapp: apiData.agent?.whatsapp || apiData.agent?.phone || salesExec?.phone || "—",
    isResponsiveBroker: apiData.agent?.isResponsiveBroker ?? false,
    profileImage:
      apiData.agent?.profileImage ||
      salesExec?.image ||
      apiData.developer_image ||
      "https://via.placeholder.com/150",
  };

  // ── Location ────────────────────────────────────────────────
  // Ready listing sends a structured apiData.location object already
  // (address, subCommunity, city, country, emirates, coordinates GeoJSON).
  // Off-plan only has flat raw fields + latlong "lat,lng" string.
  const offPlanCoords = apiData.latlong
    ? apiData.latlong.split(",").map((coord) => parseFloat(coord.trim()))
    : [24.87269532250173, 55.04313647981814];

  // location.coordinates from ListingCreation is GeoJSON: { type:"Point", coordinates:[lng,lat] }
  const readyCoords = apiData.location?.coordinates?.coordinates
    ? [apiData.location.coordinates.coordinates[1], apiData.location.coordinates.coordinates[0]] // -> [lat, lng]
    : null;

  const location = {
    address:
      apiData.location?.address ||
      apiData.project_location ||
      apiData.district_data?.[0]?.name ||
      apiData.district_name ||
      apiData.location ||
      "—",
    subCommunity: apiData.location?.subCommunity || "—",
    country: apiData.location?.country || apiData.country_data?.name || "United Arab Emirates",
    city: apiData.location?.city || apiData.city_data?.name || apiData.city_name || "Dubai",
    emirates: apiData.location?.emirates || apiData.city_data?.name || apiData.city_name || "—",
    community:
      apiData.location?.subCommunity ||
      apiData.district_data?.[0]?.name ||
      apiData.district_name ||
      "Dubai Industrial City",
    // 🔧 FIX: was `|| "—"` — a placeholder string is truthy, so the
    // component's `{(community?.marketSupply?.image || location?.communityImage) && (...)}`
    // check always passed and rendered a broken/placeholder image block
    // even when no real community image existed. Now falls through to
    // `null` so the section can genuinely detect "no image" and hide.
    communityImage: apiData.images?.general?.[0] || apiData.location?.communityImage || null,
    coordinates: readyCoords || offPlanCoords,
  };

  // ── Building info ───────────────────────────────────────────
  // Ready listing already collects totalFloors / elevators / totalParkingSpaces
  // / swimmingPools directly — off-plan has to guess most of these.
  const buildingInfo = apiData.buildingInfo
    ? {
        buildingName: apiData.buildingInfo.buildingName || apiData.developer_name || "—",
        yearOfCompletion:
          apiData.buildingInfo.yearOfCompletion ||
          (apiData.expected_completion_date
            ? new Date(apiData.expected_completion_date).getFullYear()
            : "—"),
        totalFloors: apiData.buildingInfo.totalFloors ?? "—",
        swimmingPools: apiData.buildingInfo.swimmingPools === "available" ? "Yes" : "—",
        totalParkingSpaces: apiData.buildingInfo.totalParkingSpaces ?? "—",
        totalBuildingArea: apiData.buildingInfo.totalBuildingArea ?? apiData.area_end ?? "—",
        elevators: apiData.buildingInfo.elevators === "available" ? "Yes" : "—",
      }
    : {
        buildingName: apiData.developer_name || "—",
        yearOfCompletion: apiData.expected_completion_date
          ? new Date(apiData.expected_completion_date).getFullYear()
          : "—",
        totalFloors: "—",
        // FIX: was checking `amenitiesArray.includes("Swimming Pool")` which
        // needed an exact-case match against whatever `amenitiesArray` ended
        // up being. Now checks the same case-insensitively against BOTH the
        // plain amenity names and the facility names so it isn't silently
        // wrong just because the source used different casing/wording.
        swimmingPools: [...amenitiesArray, ...facilitiesArray.map((f) => f.name)]
          .some((n) => String(n).toLowerCase().includes("pool"))
          ? "Yes"
          : "—",
        totalParkingSpaces: apiData.parkings?.[0]?.data?.[0]
          ? Object.values(apiData.parkings[0].data[0])[0]
          : "1 parking",
        totalBuildingArea: "—",
        elevators: "—",
      };

  // ── Regulatory info ─────────────────────────────────────────
  // Ready listing collects this explicitly on the form.
  const regulatoryInfo = apiData.regulatoryInfo
    ? {
        permitNumber: apiData.regulatoryInfo.permitNumber || apiData.adm_number || "N/A",
        zoneName:
          apiData.regulatoryInfo.zoneName || apiData.district_data?.[0]?.name || "N/A",
        rera: apiData.regulatoryInfo.rera || "Approved",
        brn: apiData.regulatoryInfo.brn || "Approved",
        registeredAgency: apiData.regulatoryInfo.registeredAgency || "RTO",
      }
    : {
        permitNumber: apiData.adm_number || "N/A",
        zoneName: apiData.district_data?.[0]?.name || "N/A",
        rera: "Approved",
        brn: "Approved",
        registeredAgency: "RTO",
      };

  // ── Investment insights ─────────────────────────────────────
  // 🔧 FIX: fallbacks changed from "—" to null. A placeholder string is
  // truthy in JS, so the component's section-level check
  // `{(investmentInsights?.rentalYield || investmentInsights?.priceTrend || investmentInsights?.pricePerSqFt) && (...)}`
  // would always be true and the whole "Investment Insights" block would
  // render even when the API sent nothing for it. With `null` here, the
  // component can correctly detect "no insights data at all" and hide the
  // entire section instead of showing three empty "—" rows.
  const investmentInsights = {
    rentalYield: apiData.investmentInsights?.rentalYield || null,
    priceTrend: apiData.investmentInsights?.priceTrend || null,
    pricePerSqFt: apiData.investmentInsights?.pricePerSqFt || apiData.pricePerSqFt || null,
  };

  // ── Community block ─────────────────────────────────────────
  const community = {
    title:
      apiData.location?.subCommunity ||
      apiData.district_data?.[0]?.name ||
      "Dubai Industrial City",
    slug: apiData.slug,
    marketSupply: {
      // 🔧 FIX: same reasoning as location.communityImage above — no more
      // "—" placeholder leaking through as a truthy fallback.
      image: apiData.images?.general?.[0] || location.communityImage || null,
    },
  };

  // ── Project info ────────────────────────────────────────────
  const projectInfo = {
    name: apiData.projectInfo?.name || apiData.title,
    developer: apiData.projectInfo?.developer || apiData.developer_name,
    status: apiData.projectInfo?.status || apiData.project_status || "—",
    completion: apiData.projectInfo?.completion
      ? apiData.projectInfo.completion
      : apiData.expected_completion_date
      ? new Date(apiData.expected_completion_date).getFullYear()
      : "—",
  };

  // ── Completion / status badge ───────────────────────────────
  // THE KEY FIELD the detail page reads for the "Ready" / "Off-Plan" badge.
  const completionStatus = apiData.project_status || apiData.completionStatus || "Off-Plan";

  // ── Info rows ───────────────────────────────────────────────
  const info = [
    { label: "Project Status", value: completionStatus },
    {
      label: "Expected Completion",
      value: apiData.expected_completion_date || apiData.handoverDate || "—",
    },
    { label: "Developer", value: apiData.developer_name || "—" },
    { label: "District", value: location.community || "—" },
    { label: "Total Properties", value: apiData.total_properties ?? "—" },
  ];

  // ── Overview stats ──────────────────────────────────────────
  const overview = {
    bedrooms: apiData.bedrooms || apiData.beds || "—",
    bathrooms: apiData.bathrooms || apiData.baths || "—",
    garage: apiData.garage ?? "1",
    yearBuilt: apiData.expected_completion_date
      ? new Date(apiData.expected_completion_date).getFullYear()
      : "—",
    areaSize: `${apiData.builtUpArea || apiData.area_start || "—"} Sq Ft`,
  };

  // ── Images ──────────────────────────────────────────────────
  // `all_images` is the canonical flat array of URL strings used both by the
  // listings GRID card (photo-count badge + carousel) and this detail page —
  // confirmed from the off-plan doc shape. Ready listings must be saved with
  // gallery URLs under this SAME field name after upload, or the grid card /
  // detail page will render with no photos even though the upload succeeded.
  // apiData.images (array) and images.feature (off-plan cover) are only
  // fallbacks for shapes that don't have all_images populated yet.
  const images =
    Array.isArray(apiData.all_images) && apiData.all_images.length > 0
      ? apiData.all_images
      : Array.isArray(apiData.images) && apiData.images.length > 0
      ? apiData.images
      : [apiData.images?.feature || "https://via.placeholder.com/800x600"];

  // ── Final mapped object ─────────────────────────────────────
  const mapped = {
    id: apiData.id || apiData._id,
    slug: apiData.slug,
    title: apiData.title,
    description: apiData.description,
    referenceNo: apiData.referenceNo || apiData.slug,
    price: apiData.price || apiData.price_start,
    price_start: apiData.price_start || apiData.price,
    price_end: apiData.price_end || apiData.price,
    currency: apiData.currency || "AED",
    types: apiData.types || apiData.type || apiData.property_types?.[0] || "Apartments",
    type: apiData.type || apiData.types || apiData.property_types?.[0] || "Apartments",

    completionStatus,
    propertyStatus: apiData.propertyStatus || completionStatus,
    listingStatus: apiData.listingStatus || apiData.project_status || "Available",
    availability: apiData.availability || "—",
    isFeatured: apiData.isFeatured ?? apiData.is_featured ?? false,
    handoverDate: apiData.handoverDate || apiData.expected_completion_date,
    listingDate: apiData.listingDate || apiData.created_at,
    yearBuilt: apiData.expected_completion_date
      ? new Date(apiData.expected_completion_date).getFullYear()
      : "—",

    bedrooms: apiData.bedrooms || apiData.beds || "—",
    bathrooms: apiData.bathrooms || apiData.baths || "—",
    rooms: apiData.rooms || "—",
    garage: apiData.garage ?? "1",
    builtUpArea: apiData.builtUpArea || apiData.area_start,
    totalBuildingArea: apiData.totalBuildingArea || apiData.area_end,
    sqft: apiData.builtUpArea || apiData.area_start,

    furnishing: apiData.furnishing || "Modern",
    // Plain name list (e.g. for a comma/tag list UI):
    features: amenitiesArray,
    amenities: amenitiesArray,
    // Name + image/icon list (e.g. for amenity cards with icons):
    facilities: facilitiesArray,

    images: images,
    videos: apiData.videos || [],
    youtubeVideoId: apiData.youtubeVideoId || null,
    brochureUrl: apiData.brochureUrl || apiData.attachments?.[0]?.attachment_url || "#",

    developer: apiData.developer_name || apiData.developer,
    builder: apiData.developer_name || apiData.developer,
    ownership: apiData.ownership
      ? apiData.ownership.charAt(0).toUpperCase() + apiData.ownership.slice(1)
      : "Freehold",

    agent: agent,
    location: location,
    buildingInfo: buildingInfo,
    regulatoryInfo: regulatoryInfo,
    investmentInsights: investmentInsights,
    community: community,
    projectInfo: projectInfo,
    unitTypes: unitTypes,
    floorPlans: floorPlans,
    paymentPlan: paymentPlan,
    overview: overview,
    info: info,

    serviceCharges: apiData.serviceCharges ?? "—",
    pricePerSqFt: apiData.investmentInsights?.pricePerSqFt || apiData.pricePerSqFt || "—",
    rating: apiData.rating ?? null,
    reviews: apiData.reviews || [],
    // NOTE: this collides with the form's "purpose" field (buy/sell listing intent).
    // Detail page's `purpose` means property USAGE (Residential/Commercial), so it's
    // sourced from `usage`, not the buy/sell field.
    purpose: apiData.usage
      ? apiData.usage.charAt(0).toUpperCase() + apiData.usage.slice(1)
      : "Residential",

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