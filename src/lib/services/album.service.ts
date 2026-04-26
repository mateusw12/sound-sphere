import { BASE_PATH } from "@/lib/services/base.service";

export class AlbumService {
  static byId(id: string | number) {
    return `${BASE_PATH}/album/${id}`;
  }

  static tracks(id: string | number) {
    return `${BASE_PATH}/album/${id}/tracks`;
  }
}
