import Link from "next/link";
import Image from "next/image";
import type { DeezerAlbum } from "@/lib/dto";
import { FavoriteButton } from "@/components/favorite-button";

type AlbumCardProps = {
  album: DeezerAlbum;
};

export function AlbumCard({ album }: AlbumCardProps) {
  const image = album.cover_medium ?? album.cover;

  return (
    <article className="card">
      {image ? (
        <Image src={image} alt={album.title} width={320} height={320} className="card-cover" />
      ) : null}
      <h3>{album.title}</h3>
      <p>{album.artist?.name ?? "Album"}</p>
      <div className="card-actions card-actions-short">
        <Link href={`/album/${album.id}`} className="button-link compact">
          Abrir
        </Link>
        <FavoriteButton
          compact
          kind="album"
          entityId={album.id}
          title={album.title}
          subtitle={album.artist?.name}
          image={image}
          href={`/album/${album.id}`}
        />
      </div>
    </article>
  );
}
