/**
 * Address search for Norway via Kartverket's open API.
 * No API key. Call directly from the app — there's nothing to hide behind a proxy.
 * Each result already includes lat/lon, so search and geocoding are one request.
 */

const ENDPOINT = "https://ws.geonorge.no/adresser/v1/sok";

export interface AddressSuggestion {
  id: string;
  /** As Kartverket returns it — may be prefixed with a landmark name, e.g. "Sandar kirke, Storgata 12". */
  addressText: string;
  /** Just the street + number, e.g. "Storgata 12" — use this to fill a field once the user picks a suggestion. */
  streetAddress: string;
  /** "Oslo" — the API returns "OSLO", we title-case it. */
  city: string;
  postalCode: string;
  /** Ready to render: "Storgata 12, 0184 Oslo" */
  label: string;
  lat: number;
  lon: number;
}

interface RawAddress {
  adressetekst?: string;
  poststed?: string;
  postnummer?: string;
  representasjonspunkt?: { lat?: number; lon?: number };
}

/**
 * Kartverket's `adressetekst` sometimes prefixes the street with a named
 * building/landmark (`adressetilleggsnavn`), e.g. "Sandar kirke, Storgata 12".
 * Only the part after the last comma is the actual street + number.
 */
function streetAddressOnly(addressText: string): string {
  const parts = addressText.split(",");
  return parts[parts.length - 1].trim();
}

function toTitleCase(value: string): string {
  return value
    .toLocaleLowerCase("nb-NO")
    .replace(
      /(^|[\s\-/])(\p{L})/gu,
      (_m, sep, ch) => sep + ch.toLocaleUpperCase("nb-NO"),
    );
}

/**
 * Search is wildcard-based, not fuzzy — no typo tolerance.
 * Pass an AbortSignal to cancel superseded requests; the rejection is an AbortError.
 */
export async function searchAddresses(
  query: string,
  signal?: AbortSignal,
): Promise<AddressSuggestion[]> {
  // Trailing "*" lets a half-typed street or number still prefix-match.
  const sok = query.trim().replace(/\*+$/, "");
  if (sok.length < 3) return [];

  const params = new URLSearchParams({
    sok: `${sok}*`,
    treffPerSide: "8",
    utkoordsys: "4326", // WGS84 lat/lon, otherwise you get EPSG:4258
    filtrer:
      "adresser.adressetekst,adresser.poststed,adresser.postnummer,adresser.representasjonspunkt",
  });

  const res = await fetch(`${ENDPOINT}?${params}`, { signal });
  if (!res.ok) throw new Error(`Kartverket search failed: ${res.status}`);

  const body = (await res.json()) as { adresser?: RawAddress[] };

  return (body.adresser ?? []).flatMap((raw) => {
    const { lat, lon } = raw.representasjonspunkt ?? {};
    const addressText = raw.adressetekst?.trim();
    if (typeof lat !== "number" || typeof lon !== "number" || !addressText)
      return [];

    const city = toTitleCase(raw.poststed?.trim() ?? "");
    const postalCode = raw.postnummer?.trim() ?? "";
    const tail = [postalCode, city].filter(Boolean).join(" ");

    return [
      {
        id: `${addressText}|${postalCode}|${lat},${lon}`,
        addressText,
        streetAddress: streetAddressOnly(addressText),
        city,
        postalCode,
        label: tail ? `${addressText}, ${tail}` : addressText,
        lat,
        lon,
      },
    ];
  });
}
