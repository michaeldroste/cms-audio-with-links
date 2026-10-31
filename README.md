[README.md](https://github.com/user-attachments/files/31518048/README.md)
# cms-audio-with-links
A single-track audio player card for [RapidWeaver Elements](https://www.realmacsoftware.com/elements). Cover artwork, title and artist, a real transport with scrubbing and skip buttons, and a row of streaming links underneath. Bind it to a CMS collection for one card per item, or drop in an audio file and use it standalone. Free, MIT licensed, no PHP required.
# CMS Audio Player with Links

A single-track audio player card for RapidWeaver Elements. Cover artwork, title
and artist, a real transport with scrubbing and skip buttons, and a row of
streaming links underneath.

Works two ways: bind it to a CMS collection and it renders one card per item, or
drop an audio file straight onto it and use it as a standalone player. No PHP
required — the page can be plain `.html`.

Free and MIT licensed. See [LICENSE](LICENSE).

## Installing

Double-click `CMS Audio Player with Links.elementsdevpack`, or drop it into Elements.
The component appears in the **CMS** group of the component palette.

Two ready-made layouts also ship with the pack, under Templates:

- **CMS Audio Player with Links — CMS Item** — every field left on its CMS binding, for
  dropping straight into a collection.
- **CMS Audio Player with Links — Standalone** — bindings cleared and the time readout on,
  for a single track with files dropped in by hand.

## Quick start — standalone

1. Drag **CMS Audio Player with Links** onto the page.
2. Drop an audio file onto the component, or set **Content → Audio File**.
3. Drop a cover image onto **Content → Image File**.
4. Type a title and artist into **Content → Track Title** / **Artist**.
5. Clear the **Streaming Links** fields, or fill in the ones you use — any link
   left empty hides its own icon.

## Quick start — CMS

The Content fields default to CMS bindings, so a collection whose items carry
these fields needs no configuration at all:

| Control | Default binding | Field type |
|---|---|---|
| Track Title | `{{item.title}}` | text |
| Artist | `{{item.artist}}` | text |
| Image URL | `{{item.image.src}}` | resource |
| Image Alt | `{{item.image.alt}}` | text |
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
  you change theme rather than needing to be re-coloured by hand.
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

## Two pairs of skip buttons

The transport has two independent skip pairs, and either can be switched off:

- **Circular** — a circular arrow with the number of seconds drawn inside it.
  Set the amount with *Circle Skip Amount*; the icon redraws to match.
- **Arrow** — a flatter mark in either bar-and-triangle or double-chevron style.

They can hold different amounts, which is the point: 10 seconds on one pair and
30 on the other is a common podcast layout.

## Accessibility

- Every control is reachable by keyboard. The progress bar is a real slider —
  arrow keys seek, space or enter toggles playback.
- Buttons carry labels that update with state ("Play" / "Pause") and with the
  configured skip amount ("Back 10 seconds").
- Artwork alt text comes from **Image Alt**, falling back to the track title so
  a screen reader never meets an unlabelled image.

## Notes

- **One player at a time.** *Auto Pause Others* is on by default, so starting a
  card pauses every other player on the page.
- **Preload** defaults to `metadata`, which fetches only enough to know the
  duration. Set it to `none` if the page carries many cards and you would rather
  spare mobile data.
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
- **The streaming links' hover colour is desktop-only on an Elements 3.x site,
  and that is Tailwind rather than this component.** Tailwind 4 compiles every
  `hover:` utility inside `@media (hover: hover)`, so the colour change on the
  Spotify, Apple Music, YouTube and Amazon links does not fire on a phone or
  tablet — where Tailwind 3 used to fire it on tap. Every Elements 3.x theme is
  Tailwind 4, so this applies to any site on the 3.0 beta line; a 2.4.x site on a
  Tailwind 3 theme is unchanged. No component can override it, because the rule
  is written by the theme's own compiler. The old behaviour is a site-wide switch
  rather than a component one: **Project Settings → Advanced**, the legacy
  tap-to-hover option added in Elements 3.0.7. The links themselves are
  unaffected — they open exactly as before, without the colour change.

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
other players** work across every Trumpet Studio audio component on a page —
including the original CMS Audio Player and Antenna.

Placing this alongside WindyTown CMS does mean two copies of a near-identical
component in your palette. Tell them apart by the palette title, not the icon:
they ship the same artwork.

