import { Button } from "@/components/ui/button"
import { PieceForm } from "@/components/piece-form"
import { Plus } from "lucide-react"
import type { Piece } from "@/lib/types"

interface DevisFormProps {
  pieces: Piece[]
  onChange: (pieces: Piece[]) => void
}

export function DevisForm({ pieces, onChange }: DevisFormProps) {
  const addPiece = () => {
    onChange([
      ...pieces,
      {
        id: crypto.randomUUID(),
        nom: "",
        surface: 0,
        etatMur: "bon",
        qualitePeinture: "standard",
      },
    ])
  }

  const updatePiece = (index: number, piece: Piece) => {
    const next = [...pieces]
    next[index] = piece
    onChange(next)
  }

  const removePiece = (index: number) => {
    onChange(pieces.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-4">
      {pieces.map((piece, i) => (
        <PieceForm
          key={piece.id}
          piece={piece}
          onChange={(p) => updatePiece(i, p)}
          onRemove={() => removePiece(i)}
          canRemove={pieces.length > 1}
        />
      ))}
      <Button variant="outline" onClick={addPiece} className="w-full">
        <Plus />
        Ajouter une pièce
      </Button>
    </div>
  )
}
