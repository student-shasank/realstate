import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import RichTextEditor from "./RichTextEditor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Redux Hooks
import { useDispatch, useSelector } from "react-redux";
import { saveCommunity, resetCommunityStatus } from "../features/communitySlice";

// helper
const slugify = (text) =>
  (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

// ✅ small helper for preview url
const fileToPreview = (file) => (file ? URL.createObjectURL(file) : "");

// ✅ reusable Image Picker
function ImagePicker({ label, preview, onPick, hint }) {
  return (
    <div className="border rounded p-3">
      <label className="block text-sm font-medium mb-2">{label}</label>

      <div className="flex flex-col gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onPick(e.target.files?.[0] || null)}
          className="w-full border rounded p-2"
        />

        {hint ? <p className="text-xs text-gray-500">{hint}</p> : null}

        <div className="w-full h-[180px] rounded overflow-hidden bg-gray-50 border flex items-center justify-center">
          {preview ? (
            <img src={preview} alt={label} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-gray-400">No image selected</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Communities() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.community);

  // ✅ defaults (NOW includes missing sections)
  const defaults = useMemo(
    () => ({
      title: "Community 1- Al Waha",

      heroCards: [
        { title: "Developer", subtitle: "Dubai Properties" },
        { title: "Master Area", subtitle: "Dubailand" },
        { title: "Property Types", subtitle: "Apartments, Townhouses, Villas" },
      ],

      overviewHtml: `
        <p>Al Waha is a gated residential community located within Dubailand, developed by Dubai Properties.</p>
        <p>The community is primarily residential in nature and is characterised by low-density development and a quiet neighbourhood setting.</p>
        <p>Al Waha is situated along Emirates Road (E611), offering direct road connectivity across Dubai while remaining removed from high-density urban districts.</p>
      `,

      // ✅ NEW: Location & Connectivity (Hero component se copy)
      locationConnectivityHtml: `
        <h3>Location & Connectivity</h3>
        <ul>
          <li><strong>Nearest Areas:</strong> Arabian Ranches, Mudon, The Sustainable City</li>
          <li><strong>Primary Road Access:</strong> Emirates Road (E611)</li>
          <li><strong>Public Transport:</strong> No direct or clearly defined public transport access; residents primarily rely on private vehicles, taxis, and ride-hailing services</li>
          <li><strong>Mobility:</strong> Private vehicles, taxis, and ride-hailing services</li>
        </ul>
      `,

      planningNoteHtml: `
        <p>Al Waha is planned as a low-density, gated residential enclave within the Dubailand corridor, with an emphasis on internal privacy, landscaped open spaces, and controlled vehicular access rather than mixed-use or commercial integration.</p>
      `,

      worshipHtml: `
        <h3>Mosques</h3>
        <p>Mudon Mosque</p>
        <p>Al Madina Al Mustadama Masjid - The Sustainable City</p>
        <h3>Churches, Temples & Gurudwaras</h3>
        <p>Located in established worship districts across Dubai and accessible by car.</p>
      `,

      readMoreHtml: `
        <p>Due to limited transaction volume over the past 12 months, statistically meaningful price movement data is not available for this community. This is common in low-density, end-user-driven residential communities.</p>
      `,

      snapshot: [
        { label: "Average Price (AED / sq.ft)", value: "961" },
        { label: "Total Transactions (YTD 2026)", value: "2" },
        { label: "Total Residential Units", value: "260" },
        { label: "Under-Construction Units", value: "0" },
      ],

      faqs: [
        {
          q: "1. Where is Al Waha located in Dubai?",
          a: "Al Waha is located within Dubailand and is accessed via Emirates Road (E611), near residential areas such as Arabian Ranches and Mudon",
        },
        {
          q: "2. What types of properties are available in Al Waha?",
          a: "The community includes a mix of apartments, townhouses, and villas.",
        },
      ],

      // ✅ NEW: Market Data description (Hero component me “Due to limited transaction…”)
      marketDataDescriptionHtml: `
        <p>Due to limited transaction volume over the past 12 months, statistically meaningful price movement data is not available for this community. This is common in low-density, end-user-driven residential communities.</p>
      `,

      // ✅ NEW: Market Activity Note fields (Hero component ke footer block)
      marketActivityTitle: "Market Activity Note",
      marketActivityUpdatedText: "Data last updated: 6 January 2026 | GST",
      marketActivityNoteLine: "Editable line for notes or methodology",
      marketActivitySource: "Source: Property Monitor",

      disclosureHtml: `
        <p>This community guide is intended for general informational and marketing purposes only.</p>
        <p>Information is based on publicly available sources, developer disclosures, and mapping data at the time of preparation.</p>
        <p>Buyers and investors are advised to independently verify all details with official developers, authorities, and service providers before making any property or investment decisions.</p>
      `,
    }),
    []
  );

  const [title, setTitle] = useState(defaults.title);
  const [slug, setSlug] = useState(slugify(defaults.title));

  const [latitude, setLatitude] = useState(defaults.latitude || 25.0743);
const [longitude, setLongitude] = useState(defaults.longitude || 55.3857);

  const [heroCards, setHeroCards] = useState(defaults.heroCards);

  const [overviewHtml, setOverviewHtml] = useState(defaults.overviewHtml);

  // ✅ NEW states
  const [locationConnectivityHtml, setLocationConnectivityHtml] = useState(
    defaults.locationConnectivityHtml
  );

  const [planningNoteHtml, setPlanningNoteHtml] = useState(defaults.planningNoteHtml);
  const [worshipHtml, setWorshipHtml] = useState(defaults.worshipHtml);
  const [readMoreHtml, setReadMoreHtml] = useState(defaults.readMoreHtml);

  const [snapshot, setSnapshot] = useState(defaults.snapshot);
  const [faqs, setFaqs] = useState(defaults.faqs);

  // ✅ NEW Market data + activity note states
  const [marketDataDescriptionHtml, setMarketDataDescriptionHtml] = useState(
    defaults.marketDataDescriptionHtml
  );
  const [marketActivityTitle, setMarketActivityTitle] = useState(defaults.marketActivityTitle);
  const [marketActivityUpdatedText, setMarketActivityUpdatedText] = useState(
    defaults.marketActivityUpdatedText
  );
  const [marketActivityNoteLine, setMarketActivityNoteLine] = useState(
    defaults.marketActivityNoteLine
  );
  const [marketActivitySource, setMarketActivitySource] = useState(defaults.marketActivitySource);

  const [disclosureHtml, setDisclosureHtml] = useState(defaults.disclosureHtml);

  // Images
  const [heroImages, setHeroImages] = useState([null, null, null]);
  const [heroPreviews, setHeroPreviews] = useState(["", "", ""]);

  const [overviewImage, setOverviewImage] = useState(null);
  const [overviewPreview, setOverviewPreview] = useState("");

  const [marketImage, setMarketImage] = useState(null);
  const [marketPreview, setMarketPreview] = useState("");

  const rteFileRef = useRef(null);

  useEffect(() => setSlug(slugify(title)), [title]);

  useEffect(() => {
    return () => {
      heroPreviews.forEach((p) => p && URL.revokeObjectURL(p));
      if (overviewPreview) URL.revokeObjectURL(overviewPreview);
      if (marketPreview) URL.revokeObjectURL(marketPreview);
    };
  }, [heroPreviews, overviewPreview, marketPreview]);

  // ✅ Redux Status Handlers
  useEffect(() => {
    if (success) {
      toast.success("New page is created sucessfully");
      dispatch(resetCommunityStatus());
    }
    if (error) {
    const errorMessage = typeof error === 'object' ? (error.message || "Something went wrong") : error;
    toast.error(`Error: ${errorMessage}`);
      dispatch(resetCommunityStatus());
    }
  }, [success, error, dispatch]);

  const updateHeroCard = (i, key, val) => {
    setHeroCards((p) => {
      const c = [...p];
      c[i] = { ...c[i], [key]: val };
      return c;
    });
  };

  const updateSnapshot = (i, key, val) => {
    setSnapshot((p) => {
      const c = [...p];
      c[i] = { ...c[i], [key]: val };
      return c;
    });
  };

  const updateFaq = (i, key, val) => {
    setFaqs((p) => {
      const c = [...p];
      c[i] = { ...c[i], [key]: val };
      return c;
    });
  };

  const addFaq = () => setFaqs((p) => [...p, { q: "", a: "" }]);
  const removeFaq = (idx) => setFaqs((p) => p.filter((_, i) => i !== idx));

  const pickHeroImage = (idx, file) => {
    setHeroImages((prev) => {
      const next = [...prev];
      next[idx] = file;
      return next;
    });

    setHeroPreviews((prev) => {
      const next = [...prev];
      if (next[idx]) URL.revokeObjectURL(next[idx]);
      next[idx] = file ? fileToPreview(file) : "";
      return next;
    });
  };

  const pickOverviewImage = (file) => {
    setOverviewImage(file);
    if (overviewPreview) URL.revokeObjectURL(overviewPreview);
    setOverviewPreview(file ? fileToPreview(file) : "");
  };

  const pickMarketImage = (file) => {
    setMarketImage(file);
    if (marketPreview) URL.revokeObjectURL(marketPreview);
    setMarketPreview(file ? fileToPreview(file) : "");
  };

  const uploadEditorImage = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await axios.post("/admin/api/uploads/image", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data?.url;
  };

  const handlePickEditorImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadEditorImage(file);
      if (!url) return alert("Upload failed");
      setOverviewHtml((prev) => `${prev}<p><img src="${url}" alt="img" /></p>`);
    } catch (err) {
      console.error(err);
    } finally {
      e.target.value = "";
    }
  };

  // ✅ Modified to use Redux Dispatch
  const handleAddPage = async () => {
    if (!title?.trim()) return alert("Title required");

    const payload = {
      title,
      slug,
      latitude: Number(latitude),   
       longitude: Number(longitude),

      hero: { cards: heroCards },

      // Overview section (NOW complete)
      overview: {
        html: overviewHtml,
        locationConnectivityHtml, // ✅ NEW
        planningNoteHtml, // (you can keep planning in separate also, but for safety we store it too)
      },

      planningNote: { html: planningNoteHtml },

      sidebar: {
        worshipHtml,
        readMoreHtml,
      },

      // Market Data + Activity Note (NOW complete)
      marketData: {
        descriptionHtml: marketDataDescriptionHtml, // ✅ NEW
        activityNote: {
          title: marketActivityTitle,
          updatedText: marketActivityUpdatedText,
          noteLine: marketActivityNoteLine,
          source: marketActivitySource,
        },
      },

      marketSupply: { rows: snapshot },

      faqs,

      disclosure: { html: disclosureHtml },

      status: "published",
    };

    dispatch(saveCommunity({ payload, heroImages, overviewImage, marketImage }));
  };

  return (
    <div className="p-6 max-w-[1100px] mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-semibold mb-6">Create Community Page</h1>

      {/* Title/Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Slug (auto)</label>
          <input
            className="w-full border rounded p-2"
            value={slug}
            onChange={(e) => setSlug(slugify(e.target.value))}
          />
        </div>
      </div>

      {/* HERO CARDS SECTION */}
      <h2 className="text-xl font-semibold mb-3">Hero Cards (3) + Images (Upload)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {heroCards.map((c, i) => (
          <div key={i} className="border rounded p-3 flex flex-col gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                className="w-full border rounded p-2 mb-2"
                value={c.title}
                onChange={(e) => updateHeroCard(i, "title", e.target.value)}
              />

              <label className="block text-sm font-medium mb-1">Subtitle</label>
              <input
                className="w-full border rounded p-2"
                value={c.subtitle}
                onChange={(e) => updateHeroCard(i, "subtitle", e.target.value)}
              />
            </div>

            <ImagePicker
              label={`Hero Card #${i + 1} Image`}
              preview={heroPreviews[i]}
              onPick={(file) => pickHeroImage(i, file)}
              hint="Upload image from your computer"
            />
          </div>
        ))}
      </div>

      {/* OVERVIEW IMAGE */}
      <h2 className="text-xl font-semibold mb-3">Community Overview Right Image</h2>
      <div className="mb-10">
        <ImagePicker
          label="Overview Big Image"
          preview={overviewPreview}
          onPick={pickOverviewImage}
          hint="Main overview image"
        />
      </div>

      {/* MARKET IMAGE */}
      <h2 className="text-xl font-semibold mb-3">Market Data Image</h2>
      <div className="mb-10">
        <ImagePicker
          label="Market Data Image"
          preview={marketPreview}
          onPick={pickMarketImage}
          hint="Inside Market Data section"
        />
      </div>

      {/* OVERVIEW RTE */}
      <h2 className="text-xl font-semibold mb-3">Community Overview (Rich Text)</h2>
      <input
        ref={rteFileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePickEditorImage}
      />
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={() => rteFileRef.current?.click()}
          className="px-3 py-2 rounded border"
        >
          + Insert Image (Upload)
        </button>
      </div>
      <div className="mb-10">
        <RichTextEditor value={overviewHtml} onChange={setOverviewHtml} />
      </div>

      {/* ✅ NEW: Location & Connectivity (Missing part added) */}
      <h2 className="text-xl font-semibold mb-3">Location & Connectivity (Rich Text)</h2>
      <div className="mb-10">
        <RichTextEditor
          value={locationConnectivityHtml}
          onChange={setLocationConnectivityHtml}
        />
      </div>

      {/* OTHER RTEs */}
      <h2 className="text-xl font-semibold mb-3">Planning Note</h2>
      <div className="mb-10">
        <RichTextEditor value={planningNoteHtml} onChange={setPlanningNoteHtml} />
      </div>

      <h2 className="text-xl font-semibold mb-3">Places of Worship</h2>
      <div className="mb-10">
        <RichTextEditor value={worshipHtml} onChange={setWorshipHtml} />
      </div>

      <h2 className="text-xl font-semibold mb-3">Read More</h2>
      <div className="mb-10">
        <RichTextEditor value={readMoreHtml} onChange={setReadMoreHtml} />
      </div>

      {/* ✅ NEW: Market Data Description (Missing part added) */}
      <h2 className="text-xl font-semibold mb-3">Market Data Description (Rich Text)</h2>
      <div className="mb-10">
        <RichTextEditor
          value={marketDataDescriptionHtml}
          onChange={setMarketDataDescriptionHtml}
        />
      </div>

      {/* ✅ NEW: Market Activity Note (Missing part added) */}
      <h2 className="text-xl font-semibold mb-3">Market Activity Note (Dynamic)</h2>
      <div className="mb-10 border rounded p-4 space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            className="w-full border rounded p-2"
            value={marketActivityTitle}
            onChange={(e) => setMarketActivityTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Updated Text</label>
          <input
            className="w-full border rounded p-2"
            value={marketActivityUpdatedText}
            onChange={(e) => setMarketActivityUpdatedText(e.target.value)}
            placeholder="Data last updated: 6 January 2026 | GST"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Note / Methodology Line</label>
          <input
            className="w-full border rounded p-2"
            value={marketActivityNoteLine}
            onChange={(e) => setMarketActivityNoteLine(e.target.value)}
            placeholder="Editable line for notes or methodology"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Source</label>
          <input
            className="w-full border rounded p-2"
            value={marketActivitySource}
            onChange={(e) => setMarketActivitySource(e.target.value)}
            placeholder="Source: Property Monitor"
          />
        </div>
      </div>

      {/* SNAPSHOT */}
      <h2 className="text-xl font-semibold mb-3">Market & Supply Snapshot</h2>
      <div className="space-y-3 mb-10">
        {snapshot.map((row, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 border rounded p-3">
            <input
              className="w-full border rounded p-2"
              value={row.label}
              onChange={(e) => updateSnapshot(i, "label", e.target.value)}
            />
            <input
              className="w-full border rounded p-2"
              value={row.value}
              onChange={(e) => updateSnapshot(i, "value", e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">FAQs</h2>
        <button type="button" onClick={addFaq} className="px-3 py-1 rounded border">
          + Add FAQ
        </button>
      </div>

      <div className="space-y-3 mb-10">
        {faqs.map((f, i) => (
          <div key={i} className="border rounded p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">FAQ #{i + 1}</span>
              <button
                type="button"
                onClick={() => removeFaq(i)}
                className="text-red-600 text-sm"
              >
                Remove
              </button>
            </div>

            <input
              className="w-full border rounded p-2 mb-2"
              value={f.q}
              onChange={(e) => updateFaq(i, "q", e.target.value)}
              placeholder="Question"
            />
            <textarea
              className="w-full border rounded p-2"
              rows={3}
              value={f.a}
              onChange={(e) => updateFaq(i, "a", e.target.value)}
              placeholder="Answer"
            />
          </div>
        ))}
      </div>

       {/* ✅ Map Coordinates Section */}
<h2 className="text-xl font-semibold mb-3">Map Location (Coordinates)</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 border rounded p-4 bg-gray-50">
  <div>
    <label className="block text-sm font-medium mb-1">Latitude</label>
    <input
      type="number"
      step="any"
      className="w-full border rounded p-2"
      value={latitude}
      onChange={(e) => setLatitude(e.target.value)}
    />
  </div>
  <div>
    <label className="block text-sm font-medium mb-1">Longitude</label>
    <input
      type="number"
      step="any"
      className="w-full border rounded p-2"
      value={longitude}
      onChange={(e) => setLongitude(e.target.value)}
    />
  </div>
</div>

      {/* DISCLOSURE */}
      <h2 className="text-xl font-semibold mb-3">Disclosure (Rich Text)</h2>
      <div className="mb-10">
        <RichTextEditor value={disclosureHtml} onChange={setDisclosureHtml} />
      </div>

      {/* SUBMIT BUTTON */}
      <button
        onClick={handleAddPage}
        disabled={loading}
        className={`px-6 py-3 rounded text-white font-semibold ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#01155E]"
        }`}
      >
        {loading ? "Saving Data..." : "Add New Page "}
      </button>
    </div>
  );
}
