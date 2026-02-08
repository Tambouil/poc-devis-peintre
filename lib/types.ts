export type EtatMur = "bon" | "moyen" | "mauvais"
export type QualitePeinture = "standard" | "premium" | "haut_de_gamme"

export interface Piece {
  id: string
  nom: string
  surface: number
  etatMur: EtatMur
  qualitePeinture: QualitePeinture
}

export interface LigneDevis {
  piece: Piece
  prixBase: number
  coeffEtat: number
  coeffQualite: number
  coutPreparation: number
  totalPiece: number
}

export interface Tarification {
  prixBaseM2: number
  coefficientsEtat: Record<EtatMur, number>
  coefficientsQualite: Record<QualitePeinture, number>
  coutPreparation: Record<EtatMur, number>
}

export interface Devis {
  pieces: Piece[]
  lignes: LigneDevis[]
  totalHT: number
  tva: number
  totalTTC: number
  dateDevis: string
  referenceDevis: string
}
