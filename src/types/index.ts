import { Feature, Geometry } from "geojson"

export type BairroProperties = {
  objectid: number
  nome: string
  regiao_adm: string
  area_plane: string
  codbairro: string
  codra: number
  codbnum: number
  link: string
  rp: string
  cod_rp: string
  codbairro_long: number
  st_areashape: number
  st_perimetershape: number
}

export type IFeatureBairro = Feature<Geometry, BairroProperties>