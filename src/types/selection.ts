export interface Selection {
  id: string;
  title: string;
  variationId: string;
  variationTitle: string;
  dateCreated: string;
}

export interface CreateSelectionInput {
  title: string;
  variationId: string;
}

export interface UpdateSelectionInput {
  title: string;
}
