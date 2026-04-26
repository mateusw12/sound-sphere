import Link from "next/link";
import Image from "next/image";
import type { DeezerPlaylist } from "@/lib/dto";
import { FavoriteButton } from "@/components/favorite-button";

type PlaylistCardProps = {
  playlist: DeezerPlaylist;
};

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  const image = playlist.picture_medium ?? playlist.picture_big ?? playlist.picture;

  return (
    <article className="card">
      {image ? (
        <Image src={image} alt={playlist.title} width={320} height={320} className="card-cover" />
      ) : null}
      <h3>{playlist.title}</h3>
      <p>{playlist.nb_tracks ? `${playlist.nb_tracks} faixas` : "Playlist"}</p>
      <Link href={`/playlist/${playlist.id}`} className="button-link">
        Abrir playlist
      </Link>
      <FavoriteButton
        kind="playlist"
        entityId={playlist.id}
        title={playlist.title}
        subtitle={playlist.nb_tracks ? `${playlist.nb_tracks} faixas` : "Playlist"}
        image={image}
        href={`/playlist/${playlist.id}`}
      />
    </article>
  );
}