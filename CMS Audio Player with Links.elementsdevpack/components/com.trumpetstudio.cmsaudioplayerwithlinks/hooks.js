/* CMS Audio Player with Links — build-time property tidy-up.
 *
 * Deliberately conservative: CMS bindings such as "{{item.audio}}" are still
 * unresolved tokens at this stage and are resolved later in the pipeline, so
 * nothing here may rewrite or discard them. Whitespace trimming only —
 * the empty vs. unresolved decision is made at runtime in script.js.
 */

/* ── Streaming icon table ────────────────────────────────────────────────────
 * Each streaming slot picks an entry by key. The template draws a single
 * <path>, so every icon is one `d` string; SVG path data allows several
 * subpaths in one string, which is how the Amazon mark keeps both of its
 * original strokes.
 *
 * `filled` chooses between a solid brand mark and an outlined one: the brand
 * logos are filled shapes, the generic icons are stroked. Getting that wrong
 * renders an outline icon as a solid blob, so the flag travels with the path
 * instead of being assumed.
 *
 * To add a service: add one entry here and one item to the matching
 * serviceNType select in properties.json. Nothing else needs to change.
 *
 * `brand: true` marks a logo that belongs to somebody else. Those five are drawn
 * in black or white and take no colour from the Inspector, because every one of
 * these companies publishes brand guidelines that say which colours their mark
 * may appear in, and an arbitrary theme colour is not among them. The feed,
 * website and email glyphs are generic symbols rather than anybody's mark, so
 * they stay fully colourable, as does a custom path the author supplies.
 *
 * `viewBox` is the ONLY per-icon size lever. Every slot's <svg> gets the same
 * serviceSize class, so two marks at the same nominal size can still read as
 * different sizes — nine of these paths were drawn to fill a 24-unit square and
 * two were not. Padding the viewBox out shrinks a mark inside the shared box;
 * tightening it enlarges one. Nothing about the path data changes, so the
 * artwork stays exactly as its owner drew it.
 *
 * Two are deliberately off the nominal 0 0 24 24 for that reason. Measured as
 * rasterised ink at the 26px default, against neighbours drawn at the same time:
 *
 *     mark       ink w x h      share of box inked
 *     spotify    20.5 x 20.5    40%   (was 26 x 26, 64%)
 *     apple      16.5 x 19.5    30%
 *     youtube    26   x 18.5    62%
 *     amazon     25   x 19      18%   (was 22 x 16.6, 14%)
 *     bandcamp   26   x 14.75   39%
 *
 * Spotify is a solid disc and the only mark that filled the box in both axes,
 * which made it the heaviest thing in every row; 20.5 puts its diameter just
 * over Apple's height, where a circle reads level with an irregular mark rather
 * than looming over it. Amazon is the sparsest by a distance — one letterform
 * and a hairline swoosh — so it was scaled up to 25 and re-centred on its own
 * ink, which also corrected the half-pixel it sat low. Both are centred on the
 * artwork rather than on the 24-unit square, so neither needs its `d` touched.
 */
const ICONS = {
    spotify: {
        label: "Spotify",
        /* Padded out from 0 0 24 24 so the disc draws at 20.5 of the 26px box
           instead of filling it corner to corner. See the note on viewBox above. */
        viewBox: "-3.22 -3.22 30.44 30.44",
        filled: true,
        brand: true,
        d: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
    },
    apple: {
        label: "Apple Music",
        viewBox: "0 0 24 24",
        filled: true,
        brand: true,
        d: "M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
    },
    youtube: {
        label: "YouTube",
        viewBox: "0 0 24 24",
        filled: true,
        brand: true,
        d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
    },
    amazon: {
        label: "Amazon Music",
        /* Tightened from 0 0 24 24 and centred on the ink rather than on the
           square, which scales the mark up to 25 of the 26px box and lifts the
           half-pixel it used to sit low. The glyph below is positioned in user
           units, so it scales with the swoosh and keeps its proportion. The
           width constraint is the swoosh, which is path data and so identical
           everywhere; the ~3.5px of headroom above the letterform is what
           absorbs a system font whose bold `a` is taller than this Mac's. */
        viewBox: "1.15 1.9 21.12 21.12",
        filled: true,
        brand: true,
        /* The two subpaths are only the swoosh beneath the wordmark; on their
           own they read as a stray arc rather than a logo. The letterform above
           them is drawn as text because it cannot be expressed as a path here,
           so `glyph` restores it. The font stack is a system one, and a single
           lowercase letter is about as safe as text rendering gets. */
        glyph: "a",
        glyphSize: 15,
        glyphY: 13.2,
        d: "M2.5 15.2c3.1 2.1 6.4 3.1 9.9 3.1 2.4 0 4.9-.5 7.3-1.5.4-.2.7.2.4.5-2.2 1.9-5.3 2.9-8.1 2.9-3.9 0-7.5-1.5-10.2-4-.3-.24-.03-.62.35-.4z M20.9 14.4c-.3-.4-2-.2-2.8-.1-.2.02-.3-.18-.05-.35 1.35-.95 3.55-.68 3.8-.36.26.33-.07 2.55-1.34 3.6-.2.16-.38.08-.29-.14.28-.71.92-2.3.63-2.65z"
    },
    bandcamp: {
        label: "Bandcamp",
        viewBox: "0 0 24 24",
        filled: true,
        brand: true,
        d: "M0 18.75l7.437-13.5H24l-7.437 13.5H0z"
    },
    rss: {
        label: "Podcast feed",
        viewBox: "0 0 24 24",
        filled: true,
        d: "M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18A2.18 2.18 0 0 1 6.18 20 2.18 2.18 0 0 1 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"
    },
    website: {
        label: "Website",
        viewBox: "0 0 24 24",
        filled: false,
        d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
    },
    email: {
        label: "Email",
        viewBox: "0 0 24 24",
        filled: false,
        d: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    }
};

/* The URL ids of the first four slots are deliberately the original
   spotifyUrl / appleUrl / youtubeUrl / amazonUrl. Renaming them would orphan
   every URL already saved in an existing document. An id is internal and never
   shown in the Inspector, so the slots read as generic to the author while the
   stored values keep working untouched. */
/* Each slot carries the same defaults its controls declare in properties.json.
   A blanket fallback here would rewrite every existing document: an instance
   saved before these controls existed has no stored Type or Show value, so
   falling back to a generic default would silently turn the four brand icons
   into anonymous link icons and switch on the two new empty slots. */
const SLOTS = [
    { url: "spotifyUrl",  type: "spotify",  enabled: true  },
    { url: "appleUrl",    type: "apple",    enabled: true  },
    { url: "youtubeUrl",  type: "youtube",  enabled: true  },
    { url: "amazonUrl",   type: "amazon",   enabled: true  },
    { url: "service5Url", type: "website",  enabled: false },
    { url: "service6Url", type: "website",  enabled: false }
];

/* The Elements language inserts {{ }} verbatim, so a value carrying a double
 * quote closes the attribute it lands in and everything after it is parsed as
 * more attributes. This component puts author text into alt, aria-label, title,
 * href, an SVG viewBox and a path's d, so the encoding is done once here rather
 * than at every one of those sites. Component Templates.md states the rule.
 *
 * Safe for the CMS path in both directions. An unresolved binding contains no
 * character this touches, so it still arrives at script.html as a literal token
 * for isToken() to recognise; and a resolved value is entity-decoded again by the
 * HTML parser, so getAttribute('data-src') and getAttribute('href') hand back the
 * address unchanged. Encoding an ampersand inside a query string is in fact the
 * correct spelling of it in an attribute.
 *
 * The built-in icon table passes through untouched — its path data is digits,
 * letters and punctuation none of which this encodes. */
const attr = (v) =>
    String(v === null || v === undefined ? "" : v)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

/* Artwork Shape "Original" stores aspect-auto, which gives the cover's wrapper
 * no ratio of its own. The image and its placeholder are both positioned
 * absolutely inside that wrapper so they overlay rather than stack, which left
 * it with nothing to measure: it collapsed to zero height and the artwork and
 * the placeholder vanished together, loaded or not.
 *
 * So for that shape the image goes back into normal flow and the wrapper takes
 * its height from it. Its aspect ratio is "auto 1/1": its own proportions once
 * it has decoded, and a square until then — no address yet, an unresolved
 * binding, a failed load — so the placeholder, which still overlays it, always
 * has a box to fill and the card never shows a gap.
 *
 * Artwork Shape is responsive, and once a breakpoint is overridden rw.props
 * hands back a run of prefixed classes ("aspect-square md:aspect-auto") rather
 * than one value. Each segment is read on its own and its prefix carried onto
 * every class it implies, as CMS Audio Player's mapClasses does for its sizes.
 * Every segment gets both halves — position and height — so a later screen size
 * undoes an earlier one whichever way round the two shapes are. A run with no
 * unprefixed segment leaves the base screen on the declared Square.
 *
 * Where no screen size uses Original the result is exactly the classes the
 * template carried before this existed, so a fixed-ratio card renders byte for
 * byte as it did. Nothing stored is rewritten. */
const COVER_FIXED = "absolute inset-0 block h-full w-full object-cover";
const COVER_OVERLAY = ["absolute", "h-full"];
const COVER_IN_FLOW = ["relative", "h-auto", "aspect-[auto_1/1]"];

const coverImageClass = (value) => {
    const segments = String(value === null || value === undefined ? "" : value)
        .trim()
        .split(/\s+/)
        .filter(Boolean);
    const isOriginal = (segment) =>
        segment.slice(segment.lastIndexOf(":") + 1) === "aspect-auto";

    if (!segments.some(isOriginal)) { return COVER_FIXED; }

    const out = ["inset-0", "block", "w-full", "object-cover"];
    if (!segments.some((segment) => segment.indexOf(":") === -1)) {
        COVER_OVERLAY.forEach((cls) => { out.push(cls); });
    }
    segments.forEach((segment) => {
        const cut = segment.lastIndexOf(":");
        const prefix = cut === -1 ? "" : segment.slice(0, cut + 1);
        (isOriginal(segment) ? COVER_IN_FLOW : COVER_OVERLAY)
            .forEach((cls) => { out.push(prefix + cls); });
    });
    return out.join(" ");
};

/* Card Alignment stores mx-auto, mr-auto or ml-auto, and set per screen size
 * it arrives as one per size, such as "mx-auto md:mr-auto". mx-auto sets BOTH
 * side margins, so a later mr-auto re-set only the right one, the left stayed
 * auto, and the card stayed centred whatever the Inspector showed (measured in
 * Chromium, 30 Oct 2026). Where a size is set, every segment now sets both
 * margins. A card with one alignment for every size keeps exactly the class it
 * had, so it publishes byte for byte as before; nothing stored is rewritten. */
const CARD_ALIGN = {
    "mx-auto": ["mx-auto"],
    "mr-auto": ["ml-0", "mr-auto"],
    "ml-auto": ["ml-auto", "mr-0"]
};

const cardAlignClass = (value) => {
    const segments = String(value === null || value === undefined ? "mx-auto" : value)
        .trim()
        .split(/\s+/)
        .filter(Boolean);
    if (!segments.some((segment) => segment.indexOf(":") !== -1)) { return segments.join(" "); }
    const out = [];
    segments.forEach((segment) => {
        const cut = segment.lastIndexOf(":");
        const prefix = cut === -1 ? "" : segment.slice(0, cut + 1);
        const classes = CARD_ALIGN[segment.slice(cut + 1)];
        if (!classes) { out.push(segment); return; }
        classes.forEach((cls) => { out.push(prefix + cls); });
    });
    return out.join(" ");
};

const transformHook = (rw) => {
    const p = rw.props;
    /* A number is kept as text: Elements AI and an MCP client write JSON, and
       a title of 1999 used to vanish here. Anything else non-text is empty. */
    const clean = (v) => (typeof v === "string" ? v.trim()
        : (typeof v === "number" && isFinite(v) ? String(v) : ""));

    /* Only a genuinely absent value falls back to the slot's declared default;
       a stored value always wins, including a stored false. */
    const stored = (v, fallback) => (v === undefined || v === null || v === "" ? fallback : v);

    const services = {};
    SLOTS.forEach((slot, i) => {
        const n = i + 1;
        const type = stored(p["service" + n + "Type"], slot.type);
        const custom = type === "custom";
        const icon = ICONS[type] || ICONS.website;
        const label = clean(p["service" + n + "Label"]);

        services["service" + n + "Url"] = attr(clean(p[slot.url]));
        services["service" + n + "Path"] = attr(custom
            ? clean(p["service" + n + "Path"])
            : icon.d);
        services["service" + n + "ViewBox"] = attr(custom
            ? (clean(p["service" + n + "ViewBox"]) || "0 0 24 24")
            : icon.viewBox);
        services["service" + n + "Filled"] = custom
            ? p["service" + n + "Filled"] !== false
            : icon.filled;
        /* Optional letterform drawn above the path — only Amazon uses it, but
           it is part of the table so any future logo can carry one. */
        /* Whether this slot draws somebody else's registered mark. The template
           uses it to hold the icon at black/white instead of the Inspector
           colour; see the note on the icon table above. A custom path is the
           author's own business and never counts. */
        services["service" + n + "IsBrand"] = !custom && icon.brand === true;
        services["service" + n + "Glyph"] = custom ? "" : (icon.glyph || "");
        services["service" + n + "HasGlyph"] = !custom && !!icon.glyph;
        services["service" + n + "GlyphSize"] = icon.glyphSize || 15;
        services["service" + n + "GlyphY"] = icon.glyphY || 13.2;
        /* An icon with no accessible name is announced as just "link", so the
           chosen service's own name is used whenever the label is left blank. */
        services["service" + n + "Label"] = attr(label || (custom ? "Link" : icon.label));
        /* A slot with no drawable path would emit an empty <svg>; treat that as
           switched off rather than shipping an invisible link. So is one whose
           URL is empty here: a CMS binding is a non-empty token at this point,
           so an empty one stays empty, and setupServices() only hid it once
           the page script ran, which the edit canvas never does. */
        services["service" + n + "Show"] =
            stored(p["service" + n + "Enabled"], slot.enabled) !== false &&
            services["service" + n + "Path"] !== "" &&
            services["service" + n + "Url"] !== "";
    });

    /* What the five brand marks are drawn in. Black and white are the two
       treatments every one of those companies permits, and which of them works
       is decided by THIS COMPONENT'S Card Background, not by the site's theme —
       this pack ships surface-50 in light mode and dark mode alike, so a
       `dark:` variant would have painted the marks white on a near-white card
       for every visitor in dark mode. (Its twin, WindyTown CMS, is a personal
       copy that is not given away, and it offers a third value — Theme Colour,
       its default — that lets the marks follow Service Icon like any other
       glyph. That option is deliberately absent here and must never be ported
       across: this pack runs on strangers' sites, where those companies'
       guidelines apply.) It is an Inspector choice
       rather than something inferred from the background, because a theme
       control's shape when a hook reads it is undocumented and guessing at its
       brightness is exactly the kind of assumption that breaks silently.

       Hover fades rather than recolours, so the mark never leaves its permitted
       two. */
    const brandTone = stored(p.brandIconTone, "text-black");
    const brandIconClass =
        (brandTone === "text-white" ? "text-white" : "text-black") + " hover:opacity-70";

    // Stray whitespace pasted into a URL field breaks the anchor, and a
    // trailing space on a token stops the runtime token check matching.
    rw.setProps({
        trackTitle: attr(clean(p.trackTitle)),
        trackArtist: attr(clean(p.trackArtist)),
        imageUrl: attr(clean(p.imageUrl)),
        imageAlt: attr(clean(p.imageAlt)),
        audioUrl: attr(clean(p.audioUrl)),
        coverImageClass: coverImageClass(p.coverAspect),
        cardAlign: cardAlignClass(p.cardAlign),

        /* The progress row needs the transport: with Show Transport off
           there is no Play button, so the bar was a focusable slider nothing
           could start, and a click on it fetched audio for a card meant not
           to play. Show Transport wins, and the Inspector says so. */
        progressShown: p.showTransport !== false && p.showProgress !== false,

        /* Free-text controls the template reads straight into data-label-* and
           aria-label attributes. Re-emitted here so they go through the same
           encoding as everything else; each falls back to its own control default
           so an instance saved before this change reads exactly as it did. */
        playLabel: attr(clean(p.playLabel) || "Play"),
        pauseLabel: attr(clean(p.pauseLabel) || "Pause"),
        seekLabel: attr(clean(p.seekLabel) || "Seek"),
        skipBackLabel: attr(clean(p.skipBackLabel) || "Back %s seconds"),
        skipForwardLabel: attr(clean(p.skipForwardLabel) || "Forward %s seconds"),
        audioUnavailableLabel: attr(clean(p.audioUnavailableLabel) || "Audio unavailable"),
        downloadLabel: attr(clean(p.downloadLabel) || "Download"),

        brandIconClass,
        ...services,

        // Drawn inside the circular skip glyph and read back by script.js,
        // so guarantee a sane integer rather than an empty or fractional one.
        circleSkipAmount: Math.max(1, Math.round(Number(p.circleSkipAmount) || 20)),
        arrowSkipAmount: Math.max(1, Math.round(Number(p.arrowSkipAmount) || 20))
    });
};

exports.transformHook = transformHook;
