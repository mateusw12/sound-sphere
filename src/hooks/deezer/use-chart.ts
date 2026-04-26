"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import type { DeezerChartResponse } from "@/lib/dto";
import { ChartService } from "@/lib/services";

export function useChart() {
  return useSWR<DeezerChartResponse>(ChartService.global(), fetcher);
}
