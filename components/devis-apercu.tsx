import type { Devis } from "@/lib/types"
import { formaterPrix } from "@/lib/pricing"

interface DevisApercuProps {
  devis: Devis
}

const ETAT_LABELS = { bon: "Bon", moyen: "Moyen", mauvais: "Mauvais" } as const
const QUALITE_LABELS = {
  standard: "Standard",
  premium: "Premium",
  haut_de_gamme: "Haut de gamme",
} as const

export function DevisApercu({ devis }: DevisApercuProps) {
  return (
    <div className="rounded-xl border bg-white p-6 text-sm print:border-none print:p-0 print:shadow-none">
      {/* En-tête */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold">Devis Peinture</h2>
          <p className="text-muted-foreground">Entreprise de Peinture</p>
        </div>
        <div className="text-right text-muted-foreground">
          <p>Réf: {devis.referenceDevis}</p>
          <p>Date: {devis.dateDevis}</p>
        </div>
      </div>

      {/* Tableau */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="pb-2 font-medium">Pièce</th>
            <th className="pb-2 text-right font-medium">Surface</th>
            <th className="pb-2 text-right font-medium">État</th>
            <th className="pb-2 text-right font-medium">Qualité</th>
            <th className="pb-2 text-right font-medium">Préparation</th>
            <th className="pb-2 text-right font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          {devis.lignes.map((ligne) => (
            <tr key={ligne.piece.id} className="border-b last:border-b-0">
              <td className="py-2">{ligne.piece.nom || "—"}</td>
              <td className="py-2 text-right">{ligne.piece.surface} m²</td>
              <td className="py-2 text-right">
                {ETAT_LABELS[ligne.piece.etatMur]} (×{ligne.coeffEtat})
              </td>
              <td className="py-2 text-right">
                {QUALITE_LABELS[ligne.piece.qualitePeinture]} (×{ligne.coeffQualite})
              </td>
              <td className="py-2 text-right">{formaterPrix(ligne.coutPreparation)}</td>
              <td className="py-2 text-right font-medium">
                {formaterPrix(ligne.totalPiece)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totaux */}
      <div className="mt-4 flex flex-col items-end gap-1 border-t pt-4">
        <div className="flex gap-8">
          <span className="text-muted-foreground">Total HT</span>
          <span className="w-28 text-right">{formaterPrix(devis.totalHT)}</span>
        </div>
        <div className="flex gap-8">
          <span className="text-muted-foreground">TVA (10%)</span>
          <span className="w-28 text-right">{formaterPrix(devis.tva)}</span>
        </div>
        <div className="flex gap-8 text-base font-bold">
          <span>Total TTC</span>
          <span className="w-28 text-right">{formaterPrix(devis.totalTTC)}</span>
        </div>
      </div>
    </div>
  )
}
