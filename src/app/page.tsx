"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-context";

export default function SignInPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { isAuthenticated, hydrated, login } = useAuth();

  useEffect(() => {
    if (hydrated && isAuthenticated) {
      router.replace("/home");
    }
  }, [hydrated, isAuthenticated, router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login({
      name: name.trim(),
      email: email.trim().toLowerCase(),
    });

    router.push("/home");
  };

  if (!hydrated) {
    return null;
  }

  return (
    <section className="auth-screen">
      <div className="auth-bg-shape auth-bg-shape-left" aria-hidden />
      <div className="auth-bg-shape auth-bg-shape-right" aria-hidden />

      <article className="auth-card">
        <header className="auth-head">
          <Image
            src="/assets/branding/sound-sphere.png"
            alt="SoundSphere"
            width={72}
            height={72}
            className="auth-logo"
            priority
          />
          <p className="kicker">Boas-vindas</p>
          <h1>Entre na SoundSphere</h1>
          <p>Use seu nome e email para acessar sua experience musical personalizada.</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Seu nome"
            autoComplete="name"
            required
            minLength={2}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="voce@email.com"
            autoComplete="email"
            required
          />

          <button type="submit" className="button auth-submit">
            Entrar
          </button>
        </form>
      </article>
      <div className="auth-copy">
        <p className="kicker">Music discovery hub</p>
        <h2>Descubra artistas, trilhas e albuns no mesmo lugar.</h2>
        <p>
          Sua sessão fica salva localmente para continuar de onde parou.
        </p>
      </div>
    </section>
  );
}
