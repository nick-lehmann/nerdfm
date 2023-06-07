export class Track {
  constructor(readonly id: number, readonly name: string) {}
}

export class DbTrack {
  constructor(readonly id: string, readonly name: string) {}
}

export abstract class BaseMapper<Model, Other> {
  toModel(other: Other): Model
  toModel(other: Other | null): Model | null
  toModel(other: Other | undefined): Model | undefined
  toModel(other: Other[]): Model[]
  toModel(other: Other | Other[] | null | undefined): Model | Model[] | null | undefined {
    if (other == null) return null
    if (other == undefined) return undefined
    if (Array.isArray(other)) return other.map((o) => this.toSingleModel(o))
    return this.toSingleModel(other)
  }

  abstract toSingleModel(other: Other): Model

  fromModel(model: Model): Other
  fromModel(model: Model | null): Other | null
  fromModel(model: Model | undefined): Other | undefined
  fromModel(model: Model[]): Other[]
  fromModel(model: Model | Model[] | null | undefined): Other | Other[] | null | undefined {
    if (model == null) return null
    if (model == undefined) return undefined
    if (Array.isArray(model)) return model.map((m) => this.fromSingleModel(m))
    return this.fromSingleModel(model)
  }

  abstract fromSingleModel(model: Model): Other
}
