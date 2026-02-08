import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"
import type { Piece, EtatMur, QualitePeinture } from "@/lib/types"
import { calculerLigneDevis, formaterPrix } from "@/lib/pricing"

interface PieceFormProps {
  piece: Piece
  onChange: (piece: Piece) => void
  onRemove: () => void
  canRemove: boolean
}

const ETATS: { value: EtatMur; label: string }[] = [
  { value: "bon", label: "Bon" },
  { value: "moyen", label: "Moyen" },
  { value: "mauvais", label: "Mauvais" },
]

const QUALITES: { value: QualitePeinture; label: string }[] = [
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "haut_de_gamme", label: "Haut de gamme" },
]

export function PieceForm({ piece, onChange, onRemove, canRemove }: PieceFormProps) {
  const ligne = calculerLigneDevis(piece)

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{piece.nom || "Nouvelle pièce"}</CardTitle>
        <CardAction>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{formaterPrix(ligne.totalPiece)}</Badge>
            {canRemove && (
              <Button variant="ghost" size="icon-xs" onClick={onRemove}>
                <Trash2 />
              </Button>
            )}
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Field>
          <FieldLabel>Nom</FieldLabel>
          <Input
            value={piece.nom}
            onChange={(e) => onChange({ ...piece, nom: e.target.value })}
            placeholder="Ex: Salon"
          />
        </Field>
        <Field>
          <FieldLabel>Surface (m²)</FieldLabel>
          <Input
            type="number"
            min={0}
            step={0.1}
            value={piece.surface || ""}
            onChange={(e) =>
              onChange({ ...piece, surface: parseFloat(e.target.value) || 0 })
            }
            placeholder="0"
          />
        </Field>
        <Field>
          <FieldLabel>État du mur</FieldLabel>
          <Select
            value={piece.etatMur}
            onValueChange={(v) => onChange({ ...piece, etatMur: v as EtatMur })}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ETATS.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel>Qualité peinture</FieldLabel>
          <Select
            value={piece.qualitePeinture}
            onValueChange={(v) =>
              onChange({ ...piece, qualitePeinture: v as QualitePeinture })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {QUALITES.map((q) => (
                <SelectItem key={q.value} value={q.value}>
                  {q.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </CardContent>
    </Card>
  )
}
