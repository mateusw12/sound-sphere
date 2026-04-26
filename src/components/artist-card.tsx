import Link from "next/link";
import Image from "next/image";
import type { DeezerArtist } from "@/lib/dto";
import { FavoriteButton } from "@/components/favorite-button";

type ArtistCardProps = {
  artist: DeezerArtist;
};

export function ArtistCard({ artist }: ArtistCardProps) {
  const image = artist.picture_medium ?? artist.picture;

  return (
    <article className="card">
      {image ? (
        <Image src={image} alt={artist.name} width={320} height={320} className="card-cover" />
      ) : null}
      <h3>{artist.name}</h3>
      <p>{artist.nb_fan ? `${artist.nb_fan.toLocaleString("pt-BR")} fans` : "Artista"}</p>
      <Link href={`/artist/${artist.id}`} className="button-link">
        Ver artista
      </Link>
      <FavoriteButton
        kind="artist"
        entityId={artist.id}
        title={artist.name}
        subtitle={artist.nb_fan ? `${artist.nb_fan.toLocaleString("pt-BR")} fans` : "Artista"}
        image={image}
        href={`/artist/${artist.id}`}
      />
    </article>
  );
}
