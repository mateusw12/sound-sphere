const BASE_PATH = "/api/deezer";

export class DeezerService {
  static search(query: string) {
    return `${BASE_PATH}/search?q=${encodeURIComponent(query)}`;
  }

  static searchArtists(query: string) {
    return `${BASE_PATH}/search/artist?q=${encodeURIComponent(query)}`;
  }

  static searchAlbums(query: string) {
    return `${BASE_PATH}/search/album?q=${encodeURIComponent(query)}`;
  }

  static chart() {
    return `${BASE_PATH}/chart`;
  }

  static artistById(id: string | number) {
    return `${BASE_PATH}/artist/${id}`;
  }

  static artistTop(id: string | number, limit = 10) {
    return `${BASE_PATH}/artist/${id}/top?limit=${limit}`;
  }

  static artistAlbums(id: string | number) {
    return `${BASE_PATH}/artist/${id}/albums`;
  }

  static albumById(id: string | number) {
    return `${BASE_PATH}/album/${id}`;
  }

  static albumTracks(id: string | number) {
    return `${BASE_PATH}/album/${id}/tracks`;
  }
}
