import React, { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

// helper
const slugify = (text) =>
  (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function Communities() {
  // ✅ DEFAULT TEMPLATE (pre-filled)
  const defaultTemplate = useMemo(
    () => ({
      title: "Community 1- Al Waha",
      slug: "community-1-al-waha",

      // HERO CARDS
      heroCards: [
        {
          title: "Developer",
          subtitle: "Dubai Properties",
          imageUrl:
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Master Area",
          subtitle: "Dubailand",
          imageUrl:
            "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Property Types",
          subtitle: "Apartments, Townhouses, Villas",
          imageUrl:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        },
      ],

      // ✅ Rich Text: Overview
      overviewHtml: `
        <p>Al Waha is a gated residential community located within Dubailand, developed by Dubai Properties.</p>
        <p>The community is primarily residential in nature and is characterised by low-density development and a quiet neighbourhood setting.</p>
        <p>Al Waha is situated along Emirates Road (E611), offering direct road connectivity across Dubai while remaining removed from high-density urban districts.</p>
      `,

      // LOCATION / CONNECTIVITY (structured)
      connectivity: [
        { label: "Nearest Areas:", value: "Arabian Ranches, Mudon, The Sustainable City" },
        { label: "Primary Road Access:", value: "Emirates Road (E611)" },
        {
          label: "Public Transport:",
          value:
            "No direct or clearly defined public transport access; residents primarily rely on private vehicles, taxis, and ride-hailing services",
        },
        { label: "Mobility:", value: "Private vehicles, taxis, and ride-hailing services" },
      ],

      // ✅ Rich Text: Planning Note
      planningNoteHtml: `
        <p>Al Waha is planned as a low-density, gated residential enclave within the Dubailand corridor, with an emphasis on internal privacy, landscaped open spaces, and controlled vehicular access rather than mixed-use or commercial integration.</p>
      `,

      // SIDE IMAGE + Worship
      sideImageUrl:
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop",

      worshipHtml: `
        <h4>Mosques</h4>
        <p>Mudon Mosque</p>
        <p>Al Madina Al Mustadama Masjid - The Sustainable City</p>
        <h4>Churches, Temples & Gurudwaras</h4>
        <p>Located in established worship districts across Dubai and accessible by car.</p>
      `,

      // READ MORE (toggle content)
      readMoreHtml: `
        <p>Due to limited transaction volume over the past 12 months, statistically meaningful price movement data is not available for this community. This is common in low-density, end-user-driven residential communities.</p>
      `,

      // MARKET SNAPSHOT
      snapshot: [
        { label: "Average Price (AED / sq.ft)", value: "961" },
        { label: "Total Transactions (YTD 2026)", value: "2" },
        { label: "Total Residential Units", value: "260" },
        { label: "Under-Construction Units", value: "0" },
      ],

      // FAQs
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

      // ✅ Rich Text: Disclosure
      disclosureHtml: `
        <p>This community guide is intended for general informational and marketing purposes only.</p>
        <p>Information is based on publicly available sources, developer disclosures, and mapping data at the time of preparation.</p>
        <p>Buyers and investors are advised to independently verify all details with official developers, authorities, and service providers before making any property or investment decisions.</p>
      `,
    }),
    []
  );

  // state
  const [title, setTitle] = useState(defaultTemplate.title);
  const [slug, setSlug] = useState(defaultTemplate.slug);

  const [heroCards, setHeroCards] = useState(defaultTemplate.heroCards);

  const [overviewHtml, setOverviewHtml] = useState(defaultTemplate.overviewHtml);
  const [planningNoteHtml, setPlanningNoteHtml] = useState(defaultTemplate.planningNoteHtml);

  const [connectivity, setConnectivity] = useState(defaultTemplate.connectivity);

  const [sideImageUrl, setSideImageUrl] = useState(defaultTemplate.sideImageUrl);
  const [worshipHtml, setWorshipHtml] = useState(defaultTemplate.worshipHtml);
  const [readMoreHtml, setReadMoreHtml] = useState(defaultTemplate.readMoreHtml);

  const [snapshot, setSnapshot] = useState(defaultTemplate.snapshot);

  const [faqs, setFaqs] = useState(defaultTemplate.faqs);

  const [disclosureHtml, setDisclosureHtml] = useState(defaultTemplate.disclosureHtml);

  // auto slug
  useEffect(() => {
    setSlug(slugify(title));
  }, [title]);

  // quill toolbar
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  // handlers
  const updateHeroCard = (index, key, value) => {
    setHeroCards((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [key]: value };
      return copy;
    });
  };

  const updateConnectivity = (index, key, value) => {
    setConnectivity((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [key]: value };
      return copy;
    });
  };

  const updateSnapshot = (index, key, value) => {
    setSnapshot((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [key]: value };
      return copy;
    });
  };

  const updateFaq = (index, key, value) => {
    setFaqs((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [key]: value };
      return copy;
    });
  };

  const addFaq = () => setFaqs((p) => [...p, { q: "", a: "" }]);
  const removeFaq = (idx) => setFaqs((p) => p.filter((_, i) => i !== idx));

  const handleAddPage = async () => {
    // ✅ payload we will store in MongoDB
    const payload = {
      title,
      slug,

      hero: { cards: heroCards },

      overview: { html: overviewHtml },
      connectivity,

      planningNote: { html: planningNoteHtml },

      sidebar: {
        imageUrl: sideImageUrl,
        worshipHtml,
        readMoreHtml,
      },

      snapshot,
      faqs,

      disclosure: { html: disclosureHtml },

      status: "published",
    };

    // ✅ admin backend endpoint
    await axios.post("/admin/api/communities", payload);

    alert("✅ Page saved in MongoDB!");
  };

  return (
    <div className="p-6 max-w-[1100px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Create Community Page</h1>

      {/* Title + Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Community title..."
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Slug (auto)</label>
          <input
            className="w-full border rounded p-2"
            value={slug}
            onChange={(e) => setSlug(slugify(e.target.value))}
            placeholder="community-slug"
          />
        </div>
      </div>

      {/* Hero Cards */}
      <h2 className="text-xl font-semibold mb-3">Hero Cards (3)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {heroCards.map((c, i) => (
          <div key={i} className="border rounded p-3">
            <label className="block text-sm font-medium mb-1">Card Title</label>
            <input
              className="w-full border rounded p-2 mb-2"
              value={c.title}
              onChange={(e) => updateHeroCard(i, "title", e.target.value)}
            />

            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <input
              className="w-full border rounded p-2 mb-2"
              value={c.subtitle}
              onChange={(e) => updateHeroCard(i, "subtitle", e.target.value)}
            />

            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              className="w-full border rounded p-2"
              value={c.imageUrl}
              onChange={(e) => updateHeroCard(i, "imageUrl", e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Overview Rich Text */}
      <h2 className="text-xl font-semibold mb-3">Community Overview (Rich Text)</h2>
      <div className="bg-white border rounded mb-10">
        <ReactQuill value={overviewHtml} onChange={setOverviewHtml} modules={quillModules} />
      </div>

      {/* Connectivity */}
      <h2 className="text-xl font-semibold mb-3">Location & Connectivity</h2>
      <div className="space-y-3 mb-10">
        {connectivity.map((item, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 border rounded p-3">
            <div>
              <label className="block text-sm font-medium mb-1">Label</label>
              <input
                className="w-full border rounded p-2"
                value={item.label}
                onChange={(e) => updateConnectivity(i, "label", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Value</label>
              <input
                className="w-full border rounded p-2"
                value={item.value}
                onChange={(e) => updateConnectivity(i, "value", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Planning Note Rich Text */}
      <h2 className="text-xl font-semibold mb-3">Planning Note (Rich Text)</h2>
      <div className="bg-white border rounded mb-10">
        <ReactQuill
          value={planningNoteHtml}
          onChange={setPlanningNoteHtml}
          modules={quillModules}
        />
      </div>

      {/* Sidebar Image + Worship + Read More */}
      <h2 className="text-xl font-semibold mb-3">Sidebar Section</h2>

      <label className="block mb-2 font-medium">Sidebar Image URL</label>
      <input
        className="w-full border rounded p-2 mb-6"
        value={sideImageUrl}
        onChange={(e) => setSideImageUrl(e.target.value)}
      />

      <h3 className="font-semibold mb-2">Places of Worship (Rich Text)</h3>
      <div className="bg-white border rounded mb-8">
        <ReactQuill value={worshipHtml} onChange={setWorshipHtml} modules={quillModules} />
      </div>

      <h3 className="font-semibold mb-2">Read More Content (Rich Text)</h3>
      <div className="bg-white border rounded mb-10">
        <ReactQuill value={readMoreHtml} onChange={setReadMoreHtml} modules={quillModules} />
      </div>

      {/* Snapshot */}
      <h2 className="text-xl font-semibold mb-3">Market & Supply Snapshot</h2>
      <div className="space-y-3 mb-10">
        {snapshot.map((row, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 border rounded p-3">
            <div>
              <label className="block text-sm font-medium mb-1">Label</label>
              <input
                className="w-full border rounded p-2"
                value={row.label}
                onChange={(e) => updateSnapshot(i, "label", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Value</label>
              <input
                className="w-full border rounded p-2"
                value={row.value}
                onChange={(e) => updateSnapshot(i, "value", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">FAQs</h2>
        <button onClick={addFaq} className="px-3 py-1 rounded border">
          + Add FAQ
        </button>
      </div>

      <div className="space-y-3 mb-10">
        {faqs.map((f, i) => (
          <div key={i} className="border rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">FAQ #{i + 1}</span>
              <button onClick={() => removeFaq(i)} className="text-red-600 text-sm">
                Remove
              </button>
            </div>

            <label className="block text-sm font-medium mb-1">Question</label>
            <input
              className="w-full border rounded p-2 mb-2"
              value={f.q}
              onChange={(e) => updateFaq(i, "q", e.target.value)}
            />

            <label className="block text-sm font-medium mb-1">Answer</label>
            <textarea
              className="w-full border rounded p-2"
              rows={3}
              value={f.a}
              onChange={(e) => updateFaq(i, "a", e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Disclosure Rich Text */}
      <h2 className="text-xl font-semibold mb-3">Disclosure (Rich Text)</h2>
      <div className="bg-white border rounded mb-10">
        <ReactQuill value={disclosureHtml} onChange={setDisclosureHtml} modules={quillModules} />
      </div>

      {/* Save Button */}
      <button
        onClick={handleAddPage}
        className="px-6 py-3 rounded bg-[#01155E] text-white font-semibold"
      >
        Add Page (Save to MongoDB)
      </button>
    </div>
  );
}
