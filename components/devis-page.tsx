"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { DevisForm } from "@/components/devis-form"
import { DevisApercu } from "@/components/devis-apercu"
import { calculerDevis } from "@/lib/pricing"
import { Printer } from "lucide-react"
import type { Piece } from "@/lib/types"

const defaultPiece: Piece = {
  id: crypto.randomUUID(),
  nom: "Salon",
  surface: 20,
  etatMur: "bon",
  qualitePeinture: "standard",
}

export function DevisPage() {
  const [pieces, setPieces] = useState<Piece[]>([defaultPiece])
  const devis = useMemo(() => calculerDevis(pieces), [pieces])

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <div className="mb-6 flex items-center justify-between print:hidden">
        <h1 className="text-2xl font-bold">Devis Peinture</h1>
        <Button onClick={() => window.print()}>
          <Printer />
          Exporter PDF
        </Button>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="print:hidden">
          <DevisForm pieces={pieces} onChange={setPieces} />
        </div>
        <div className="lg:sticky lg:top-8 lg:self-start">
          <DevisApercu devis={devis} />
        </div>
      </div>
    </div>
  )
}
