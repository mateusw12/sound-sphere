import { BASE_PATH } from "@/lib/services/base.service";

export class ChartService {
  static global() {
    return `${BASE_PATH}/chart`;
  }
}
