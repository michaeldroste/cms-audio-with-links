# CMS Audio Player with Links

A single-track audio player card for RapidWeaver Elements. Cover artwork, title
and artist, a real transport with scrubbing and skip buttons, and a row of
streaming links underneath.

Works two ways: bind it to a CMS collection and it renders one card per item, or
drop an audio file straight onto it and use it as a standalone player. No PHP
required — the page can be plain `.html`.

Free and MIT licensed. See [LICENSE](LICENSE).

**Works with Elements AI and the Elements MCP server.** Every setting carries the
description Elements AI reads, so the built-in Assistant, or an AI tool connected
through the MCP server, can find and change it from a plain-language request.

## Installing

Double-click `CMS Audio Player with Links.elementsdevpack`, or drop it into Elements.
The component appears in the **CMS** group of the component palette.

Two ready-made layouts also ship with the pack, under Templates:

- **CMS Audio Player with Links — CMS Item** — every field left on its CMS binding, for
  dropping straight into a collection.
- **CMS Audio Player with Links — Standalone** — bindings cleared and the time readout on,
  for a single track with files dropped in by hand.

## Quick start — standalone

1. Drag the **CMS Audio Player with Links — Standalone** template onto the page.
   It arrives with its CMS bindings cleared and the time readout on.
2. Drop an audio file onto the component, or set **Content → Audio File**.
3. Set a cover image in **Content → Cover Image File**.
4. Type a title and artist into **Content → Title** / **Artist**.
5. Clear the **Streaming Links** fields, or fill in the ones you use — any link
   left empty hides its own icon.

Starting from the bare component instead, clear **Content → Audio URL** and
**Content → Cover Image URL** before step 2. Both ship bound to the CMS, and a
URL field always wins over its fallback file, so a dropped file is never used
while the binding is still there.

## Quick start — CMS

The Content fields default to CMS bindings, so a collection whose items carry
these fields needs no configuration at all:

| Control | Default binding | Field type |
|---|---|---|
| Title | `{{item.title}}` | text |
| Artist | `{{item.artist}}` | text |
| Cover Image URL | `{{item.image.src}}` | resource |
| Cover Alt Text | `{{item.image.alt}}` | text |
| Audio URL | `{{item.audio}}` | resource |
| Streaming slots | `{{item.spotify}}`, `{{item.apple}}`, `{{item.youtube}}`, `{{item.amazon}}` | text |

Field names that don't match are fine — retype the binding to suit your own
collection, or replace it with a plain URL.

**If your collection has no such fields**, the component still behaves sensibly:
an unresolved binding leaves the control visible but inert in the Elements
canvas, and renders as nothing at all on the published page. It never ships a
raw `{{item.…}}` token to a visitor.

## What each group covers

- **Content** — the track itself, plus fallback files for non-CMS use.
- **Layout** — card width, alignment, padding, and which of artwork / title /
  artist appear.
- **Colors** — every colour is a Theme Studio token, so the card re-skins when
  you change theme rather than needing to be re-coloured by hand. The one
  exception is the five brand marks, which are black or white by design — see
  **Brand marks** below.
- **Corner Radius** — card, artwork, progress bar, buttons and icons separately.
- **Controls** — transport visibility and sizing, the two independent pairs of
  skip buttons, progress bar, loop, and preload behaviour.
- **Streaming Links** — the icon row, its URLs, and its appearance.

## Streaming links

Six interchangeable slots sit under the player. Each one has its own **Show**
switch, a **Service** picker that sets the icon, a **Link** field, and an
optional **Label**. Slots are not tied to any particular service — set slot 1 to
Bandcamp and it becomes a Bandcamp link.

Built-in icons: Spotify, Apple Music, YouTube, Amazon Music, Bandcamp, Podcast
Feed, Website and Email.

**Anything else** — choose **Custom icon…** and paste the `d` attribute of a
single SVG `<path>` from any icon set, plus its `viewBox` (nearly always
`0 0 24 24`). Turn *Custom Icon Is Filled* off for outline-style icons and on
for solid logo shapes; getting that backwards renders an outline icon as a solid
blob.

Slots 1–4 arrive set to Spotify, Apple Music, YouTube and Amazon Music. Slots 5
and 6 start switched off.

A slot hides itself whenever its link is empty or resolves to nothing, so a CMS
item with no Bandcamp URL simply shows one fewer icon rather than a dead link.

Give each **Link** in full, starting with `https://` (or `mailto:` in an Email
slot). An address typed as `www.…` is given `https://` for you, but anything
else without it — `open.spotify.com/…`, say — is read as a page on your own
site, and the icon leads to a page that does not exist.

When *nothing* in the row is left to show — every slot switched off, or a CMS
item with none of the links filled in — the whole row is removed rather than
left standing empty, and the card's bottom edge closes up behind it. Turning
**Show Streaming Icons** off does the same thing, so no arrangement of those
switches leaves a band of blank space under the player.

## Translating the interface

Everything a screen reader announces is editable under **Labels** — the play and
pause buttons, the progress bar, both skip directions and the audio-failure
message. The two skip labels contain `%s`, which is replaced with that button's
own number of seconds, so "Back %s seconds" reads as "Back 10 seconds" on one
pair and "Back 30 seconds" on the other.

## Brand marks — black or white, by design

The Spotify, Apple Music, YouTube, Amazon Music and Bandcamp icons are other
companies' registered marks, and each of those companies publishes brand
guidelines setting out which colours their mark may appear in: its own brand
colour, black or white. An arbitrary colour from your theme is not on that
list. So those five are drawn in black or white, and on hover they fade
slightly instead of changing colour, which keeps them inside their permitted
two. Website, Email, Podcast Feed and any custom path you supply are generic
glyphs rather than anybody's mark, so they follow **Service Icon** and
**Service Icon Hover** like the rest of the card — and so does the Download
button, which is this component's own glyph.

**Colors → Streaming Icons → Brand Mark Tone** chooses which of the two. It
ships **Black**, because the card ships light. Pick the one your Card Background
can carry — white on a dark card, black on a light one. **If you darken the
card, set Brand Mark Tone to White**, or the marks will be black on black.

It is a setting rather than something automatic on purpose. A dark-mode
variant would follow **the site's** light and dark, and this card has its own:
Card Background is the same in both modes, so a site-mode variant would paint
white logos on a light card for every visitor browsing in dark mode. The tone
follows **the card** instead, and does not change when a visitor switches
theme. Nor is it worked out from your Card Background colour, because reading a
theme colour's brightness inside the component would rely on an undocumented
shape, and the failure — a black logo on a black card — is silent and easy to
miss.

**If a monochrome mark does not suit your card**, switch that slot's Service to
**Custom icon…** and supply the path yourself. The icon is then yours, and both
colour settings apply to it. The component will not put a company's logo in an
arbitrary colour on your behalf, but it does not police what you draw.

## Two pairs of skip buttons

The transport has two independent skip pairs, and either can be switched off:

- **Circular** — a circular arrow with the number of seconds drawn inside it.
  Set the amount with *Circular Skip Amount*; the icon redraws to match.
- **Arrow** — a flatter mark in either bar-and-triangle or double-chevron style,
  chosen with *Arrow Style*. Set its amount with *Arrow Skip Amount*.

They can hold different amounts, which is the point: 10 seconds on one pair and
30 on the other is a common podcast layout.

## Accessibility

- Every control is reachable by keyboard. The progress bar is a real slider:
  Right or Up skips forward 5 seconds, Left or Down back 5, Home jumps to the
  start and End to the finish, and Space or Enter toggles playback.
- Buttons carry labels that update with state ("Play" / "Pause") and with the
  configured skip amount ("Back 10 seconds"). A file that will not load keeps
  your **Audio Unavailable** label rather than going back to "Play".
- Artwork alt text comes from **Cover Alt Text**, falling back to the track
  title so a screen reader never meets an unlabelled image.

## Notes

- **One player at a time.** *Pause Other Players* is on by default, so starting
  a card pauses every other player on the page.
- **Preload** defaults to **None**, so a page of cards fetches no audio until
  something is played — and the time readout shows `0:00` until then. Choose
  **Metadata** to show each track's duration up front, at the cost of a small
  request per card.
- **A live stream plays but does not seek.** An internet-radio or other live
  address has no length, so the progress bar has nowhere to go: clicking or
  dragging it leaves the stream playing rather than restarting it. The skip
  buttons and arrow keys move only within what has already arrived, and the
  time shows the position alone.
- **Seeking needs a host that honours Range requests.** Every ordinary web host
  does, and podcast directories require it. A host that answers with the whole
  file instead (usually a download counter or a proxy in front of the audio)
  leaves Chrome and Edge unable to seek at all: they report nothing seekable and
  send any jump back to the start. On such a host the bar, the skip buttons and
  the arrow keys now do nothing rather than restarting the track; Home still
  goes to the start. No component can change what another server sends, so ask
  the host, or serve the file from ordinary storage.
- **Broken artwork** falls back to a placeholder tile rather than a broken-image
  icon. Colour it under *Colors → Artwork Placeholder*.
- **Download button** is off by default. Switch it on under *Controls →
  Playback*. It points at exactly the same file the player is using, and hides
  itself when there is nothing to download — so it can never offer a dead link.
  Bear in mind it does nothing to stop copying that a determined visitor could
  not already do; it simply makes the offer explicit.
- **Where that button leads depends on where your audio lives.** Browsers only
  honour a real download for files served from the same site as the page. If your
  audio sits anywhere else — a CDN, a media subdomain, a podcast host — the
  browser ignores the request and navigates away to the bare file, which is not
  what the button appears to offer. Where the address is off-site the button
  therefore opens the audio in a new tab, appends *(opens in a new tab)* to your
  label, and leaves the page in place. Drop the file into your project instead and
  it downloads properly. This is a browser rule, not a setting: no header on the
  other host changes it.
- **Players added after the page loads still work.** A collection using **CMS
  Load More** appends its next batch in place, and those players wire themselves
  up as they arrive. Anything else that injects markup — a lightbox, a tab built
  on demand — is picked up the same way. If something injects a player in a way
  the component cannot see, call `window.caplAudio.initAll()` afterwards.
- **On a Tailwind 4 theme, hover effects are desktop-only, and that is
  Tailwind rather than this component.** Tailwind 4 compiles every `hover:`
  utility inside `@media (hover: hover)`, so on a phone or tablet the Service
  Icon Hover colour on the Website, Email, Feed and custom icons, the fade on the
  five brand marks, and the play and skip hover colours do not fire — where
  Tailwind 3 fires them on tap. Elements 3 runs both: a theme is on Tailwind 4
  only when it declares it, and a site whose theme is still on Tailwind 3 keeps
  the tap behaviour. No component can override it, because the rule is written
  by the theme's own compiler. The old behaviour is a site-wide switch rather
  than a component one: **Project Settings → Advanced**, the legacy tap-to-hover
  option added in Elements 3.0.7. The links and buttons themselves are
  unaffected — they work exactly as before, just without the hover change.

## Build 13 — alignment per screen size, Show Transport, and a dead track

Nothing to do; this reaches cards you have already placed.

- **Alignment set per screen size now moves the card.** A card centred on
  phones and set to Left from a wider size stayed centred, because centring
  sets both margins and Left only re-set one. Each size now sets both. A card
  with one alignment for every size is unchanged.
- **With Show Transport off, the progress bar goes too.** It used to stay on the
  card as a slider nothing could start, and a click on it fetched the audio.
  Show Progress Bar says so in the Inspector.
- **After Audio unavailable, the seek bar and skip buttons stop offering to
  work**: the bar leaves the keyboard order and reads as disabled, and the skip
  buttons are disabled with the Play button.
- **A title or artist that arrives as a number is shown.** Elements AI and the
  MCP server write values as JSON, and a title of 1999 used to disappear.

## Build 11 — seeking on awkward hosts and live streams

Nothing to do; this reaches cards you have already placed.

- **On a host that ignores Range requests, a seek no longer restarts the
  track** in Chrome and Edge. It now leaves the listener where they were; see
  *Notes*.
- **Skipping forward on a live stream no longer goes silent.** It used to jump
  past what had arrived and sit there, still showing Pause, until the broadcast
  caught up. It now stops at the newest audio.
- **A live stream's time shows the position alone**, not "0:37 / 0:00", and a
  screen reader hears the same.
- **A track that will not load stops counting skips.** After Audio unavailable,
  the skip buttons and arrow keys went on moving the time to "0:20 / 0:00".

## Build 10 — the editor shows what the page will

Nothing to do; this reaches cards you have already placed.

- **A Cover Image File now shows on the editor canvas.** It was hidden there,
  because only the published page's script revealed it. The published page
  is unchanged.
- **Streaming icons with no link are left out in the editor too**, so it shows
  the icons the published page does. The published page already hid them.
- **An empty Title or Artist no longer doubles the space** beneath it. A CMS
  item with no artist, for example, left a double gap on the published page.
- **Clicking the progress bar while a track is still starting** no longer
  stops it with the button stuck on Pause.

## Build 8 — Original artwork, live streams and the keyboard

Nothing to do; this reaches cards you have already placed.

- **Artwork Shape → Original now shows the artwork.** With a cover address set,
  that shape collapsed the artwork box to nothing — the image and its
  placeholder both disappeared. The box now takes the artwork's own
  proportions, and shows the placeholder as a square while there is no artwork
  to show. Every other shape renders exactly as before.
- **Clicking the progress bar of a live stream no longer stops it.**
- **A file that will not load keeps saying so** to a screen reader, instead of
  being relabelled "Play" a moment later.
- **The progress bar answers Up, Down, Home and End** as well as Left and Right.
- **Links starting `www.` get `https://` added**, and an address carrying a
  hidden tab or control character is checked the way the browser will read it.
- **Icon Size** now stays in the Inspector while the Download button is on,
  because it sizes that button too; **Show Time** now hides while the progress
  bar is off, because the readout lives in the bar's row.

## Build 4 — the streaming row closes up when there is nothing in it

The version number moves from 1 to 2 at this build and nothing in the component
changed because of that. It is a numbering change only: the build number carries
straight on from 3, so 1.3 is the build before 2.4 and no build went missing
between them. Read the build number, not the version.

**Build 4** removes one piece of blank space. A slot with no link has always
hidden itself, and the whole row has always gone when every link on a CMS item
resolved to nothing — but the row was judged on its live links only when it had
slots in it to begin with. Switch all six **Show** switches off and the row was
still written out, empty, and an empty row still spends one of the card's *Row
Spacing* gaps: with the default spacing, about 14px of nothing between the last
control and the bottom edge of the card. The row now goes whenever nothing in it
is left to show, whichever way you arrive at that.

Nothing here is a setting, so a placed card keeps everything it holds and looks
exactly as it did — unless it was one of the cards carrying that gap, which
closes up on its own.

## Where this pack came from

This is the same player as **WindyTown CMS**, released as its own pack so the
two can be versioned separately. It started at 1.1 and inherits none of
WindyTown's upgrade history — everything in this README applies from the first
install, and there is no "if you placed a card before build N" to worry about.
Its own build notes are above.

The two packs carry different identifiers, so Elements treats them as unrelated
components. They can sit on the same page without interfering: separate palette
entries, separate settings, separate CSS class names and separate engines. They
do share the neutral `window.__rwAudioBus` registry, which is what lets **Pause
Other Players** work across every Trumpet Studio audio component on a page —
including the original CMS Audio Player and Antenna.

Placing this alongside WindyTown CMS does mean two copies of a near-identical
component in your palette. Tell them apart by the palette title, not the icon:
they ship the same artwork.


## Support

Issues and suggestions: <michaeldroste@mac.com>
