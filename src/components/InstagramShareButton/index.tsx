// src/components/InstagramShareButton.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@once-ui-system/core";

interface InstagramShareButtonProps {
  imageUrl: string;
  title: string;
}

export function InstagramShareButton({
  imageUrl,
  title,
}: InstagramShareButtonProps) {
  const [canShareFiles, setCanShareFiles] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (navigator.canShare) {
      // Test support with a dummy empty PNG file
      const testFile = new File([new Blob()], "test.png", {
        type: "image/png",
      });
      if (navigator.canShare({ files: [testFile] })) {
        setCanShareFiles(true);
      }
    }
  }, []);

  const shareImageAsset = async () => {
    try {
      setError(undefined);
      setLoading(true);

      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Falha ao baixar a imagem");
      const blob = await response.blob();

      const file = new File([blob], `${title}.png`, {
        type: blob.type,
        lastModified: Date.now(),
      });

      const shareData: ShareData = {
        title,
        files: [file],
      };

      if (navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        throw new Error("Compartilhamento de arquivos não suportado");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  if (!canShareFiles) return null;

  return (
    <>
      <Button
        id="share-instagram"
        data-border="rounded"
        variant="secondary"
        size="m"
        onClick={shareImageAsset}
        disabled={loading}
      >
        {loading ? "Preparando..." : "Compartilhar no Instagram"}
      </Button>
      {error && <p style={{ color: "var(--danger)" }}>{error}</p>}
    </>
  );
}
