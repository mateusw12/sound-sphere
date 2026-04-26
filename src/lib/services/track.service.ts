import { BASE_PATH } from "@/lib/services/base.service";

export class TrackService {
  static byId(id: string | number) {
    return `${BASE_PATH}/track/${id}`;
  }
}
