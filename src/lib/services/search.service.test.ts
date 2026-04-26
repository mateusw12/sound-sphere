import { describe, expect, it } from "vitest";
import { SearchService } from "./search.service";

describe("SearchService", () => {
  it("builds track search endpoint", () => {
    expect(SearchService.tracks("daft punk")).toBe("/api/deezer/search?q=daft%20punk");
  });

  it("builds artist search endpoint", () => {
    expect(SearchService.artists("the weeknd")).toBe("/api/deezer/search/artist?q=the%20weeknd");
  });

  it("builds album search endpoint", () => {
    expect(SearchService.albums("random access memories")).toBe(
      "/api/deezer/search/album?q=random%20access%20memories",
    );
  });

  it("builds playlist search endpoint", () => {
    expect(SearchService.playlists("chill vibes")).toBe(
      "/api/deezer/search/playlist?q=chill%20vibes",
    );
  });
});
