import { BASE_PATH } from "@/lib/services/base.service";

export class ArtistService {
  static byId(id: string | number) {
    return `${BASE_PATH}/artist/${id}`;
  }

  static top(id: string | number, limit = 10) {
    return `${BASE_PATH}/artist/${id}/top?limit=${limit}`;
  }

  static albums(id: string | number) {
    return `${BASE_PATH}/artist/${id}/albums`;
  }
}
