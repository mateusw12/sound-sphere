"use client";

import type { DeezerTrack } from "@/lib/dto";
import { AudioTrackRow } from "@/components/audio-track-row";

type AudioTrackListProps = {
  tracks: DeezerTrack[];
  limit?: number;
  emptyMessage?: string;
};

export function AudioTrackList({
  tracks,
  limit = 30,
  emptyMessage = "Nenhuma faixa disponivel.",
}: AudioTrackListProps) {
  const visibleTracks = tracks.slice(0, limit);

  if (visibleTracks.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <ol className="audio-list">
      {visibleTracks.map((track, index) => (
        <AudioTrackRow key={track.id} track={track} index={index} />
      ))}
    </ol>
  );
}
