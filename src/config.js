/**
 * SINGLE PLACE TO EDIT BUSINESS DETAILS AND THE FORM API.
 * Empty values are hidden in the UI rather than invented.
 */
export const CLINIC = {
  name: 'Advanced GroHair & GloSkin',
  shortName: 'AdGro Hair & GloSkin',
  area: 'Kovilambakkam, Chennai',
  address: 'Medavakkam Main Rd, Kovilambakkam, Chennai', // from reference page metadata; confirm full address / PIN
  phone: '+917599256789',
  phoneDisplay: '+91 75992 56789',
  email: 'adgrohair.kovilambakkam@gmail.com',
  mapUrl: '',       // TODO Google Maps link (hidden while empty)
  privacyUrl: '',   // TODO existing privacy policy URL (hidden while empty)
  siteUrl: 'https://adgrohairkovilambakkam.com',
};

export const FORM = {
  // Existing site endpoint (receives name, email, phone, date, time, treatment, message, source).
  apiUrl: 'https://adgrohairkovilambakkam.com/api/email.php',
  // 'json' | 'form' (FormData) | 'urlencoded'. Match what email.php reads (php://input = json, $_POST = form/urlencoded).
  format: 'json',
  // Where to go after success (existing thank-you route). Empty = show inline success message.
  thankYouPath: '', // e.g. '/thank-you'
  // Treatment value sent with every lead.
  treatment: 'Hair',
  // Fields this page does not collect (or the visitor left empty) are sent as "N/A".
  buildPayload: (v) => {
    const na = (x) => (x && String(x).trim() ? String(x).trim() : 'N/A');
    return {
      name: na(v.name),
      email: 'N/A',
      phone: na(v.phone),
      date: na(v.date),
      time: 'N/A',
      treatment: na(FORM.treatment),
      city: na(v.city),
      message: na([v.concern, v.city && `City: ${v.city}`].filter(Boolean).join(' | ')),
      source: 'hair-landing-kovilambakkam',
    };
  },
  // Existing GTM event name, if the old site pushes one.
  gtmEvent: 'form_submit',
};
