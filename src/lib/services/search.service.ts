import { BASE_PATH } from "@/lib/services/base.service";

export class SearchService {
  static tracks(query: string) {
    return `${BASE_PATH}/search?q=${encodeURIComponent(query)}`;
  }

  static artists(query: string) {
    return `${BASE_PATH}/search/artist?q=${encodeURIComponent(query)}`;
  }

  static albums(query: string) {
    return `${BASE_PATH}/search/album?q=${encodeURIComponent(query)}`;
  }

  static playlists(query: string) {
    return `${BASE_PATH}/search/playlist?q=${encodeURIComponent(query)}`;
  }
}
