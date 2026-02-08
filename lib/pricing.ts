import type { Piece, LigneDevis, Devis, Tarification } from "./types"

export const TARIFS: Tarification = {
  prixBaseM2: 25,
  coefficientsEtat: { bon: 1.0, moyen: 1.3, mauvais: 1.6 },
  coefficientsQualite: { standard: 1.0, premium: 1.4, haut_de_gamme: 1.8 },
  coutPreparation: { bon: 0, moyen: 50, mauvais: 120 },
}

const TVA_TAUX = 0.1

export function calculerLigneDevis(piece: Piece): LigneDevis {
  const coeffEtat = TARIFS.coefficientsEtat[piece.etatMur]
  const coeffQualite = TARIFS.coefficientsQualite[piece.qualitePeinture]
  const prixBase = piece.surface * TARIFS.prixBaseM2
  const coutPreparation = TARIFS.coutPreparation[piece.etatMur]
  const totalPiece = prixBase * coeffEtat * coeffQualite + coutPreparation

  return { piece, prixBase, coeffEtat, coeffQualite, coutPreparation, totalPiece }
}

export function calculerDevis(pieces: Piece[]): Devis {
  const lignes = pieces.map(calculerLigneDevis)
  const totalHT = lignes.reduce((sum, l) => sum + l.totalPiece, 0)
  const tva = totalHT * TVA_TAUX
  const totalTTC = totalHT + tva

  return {
    pieces,
    lignes,
    totalHT,
    tva,
    totalTTC,
    dateDevis: new Date().toLocaleDateString("fr-FR"),
    referenceDevis: genererReference(),
  }
}

export function formaterPrix(montant: number): string {
  return montant.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  })
}

export function genererReference(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, "0")
  const d = String(now.getDate()).padStart(2, "0")
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `DEV-${y}${m}${d}-${rand}`
}
