export interface Variation {
  id: string;
  title: string;
  dateCreated: string;
}

export interface CreateVariationInput {
  title: string;
}

export interface UpdateVariationInput {
  title: string;
}
