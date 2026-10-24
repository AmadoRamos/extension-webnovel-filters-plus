# Filters+ for WebNovel

Unofficial extension; not affiliated with or endorsed by WebNovel.

Chrome/Brave extension that adds extra filters to [webnovel.com](https://www.webnovel.com) category pages (for example `/stories/fanfic-video-games`).

WebNovel only loads 20 books at a time, so the extension goes through the category's pages and shows only the books that match your filters. Like the site's own list, it loads in batches: when you reach the end of the results it searches the next pages (or click **Load more**). After 500 results it stops loading on its own and waits for a click, so the page stays light. Available filters:

- Minimum and maximum chapters
- Minimum score, optionally keeping books nobody has rated yet
- Published on or after a date
- Tags the book must have (all of them with AND, or at least one with OR) and tags it must not have (any of them), in Spanish or English
- Words to exclude from the title or description
- Authors to hide (exact name, comma-separated)
- Categories to keep or hide (useful on general pages like `/stories/fanfic`)
- Hide books already in your library

The filters appear on the page, below "Sort By", and respect the status and sort order you have selected. Tags, authors and categories found while searching are saved to autocomplete those fields.

The extension's labels follow the page's language (English, Spanish, Portuguese, French, German, Indonesian, Malay, Italian, Japanese, Korean, Russian, Thai, Turkish, Vietnamese, Chinese and Filipino), falling back to English.

## Installation

1. Download or clone this repository.
2. Open `chrome://extensions` (or `brave://extensions`).
3. Turn on **Developer mode**.
4. Click **Load unpacked** and select the repository folder.
5. Open a category on webnovel.com and look for the **Filters+** section.

To update it after changes, click the reload icon on the extension's card.

## Tests

```bash
node --test
```
