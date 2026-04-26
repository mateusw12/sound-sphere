import { BASE_PATH } from "@/lib/services/base.service";

export class PlaylistService {
  static byId(id: string | number) {
    return `${BASE_PATH}/playlist/${id}`;
  }

  static tracks(id: string | number) {
    return `${BASE_PATH}/playlist/${id}/tracks`;
  }
}
