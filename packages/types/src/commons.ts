export interface IResponseRO<T = undefined> {
  status: string;
  errorMessage: string;
  numberOfRecords?: number;
  data?: T extends undefined ? never : T[];
}



// Generic mapped Type
export type PartialType<Type> = {
  // For every existing property inside the type of Type
  // convert it to be a ?: version
  [Property in keyof Type]?: Type[Property];
};

// Generic mapped Type for Edit
export type PartialTypeForEdit<Type> = {
  [Property in keyof Type]?: Type[Property];
} & { id: number };

