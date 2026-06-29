import { Helmet } from "react-helmet-async";

// 👇 Local pe automatically window.location.origin use hoga (e.g. http://localhost:5173)
// Production build me .env se VITE_SITE_URL set kar dena (e.g. https://yupland.com)
const SITE_URL = import.meta.env.VITE_SITE_URL || window.location.origin;

const Seo = ({ title, description, canonicalPath, noindex = false }) => {
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, follow" />}
    </Helmet>
  );
};

export default Seo;