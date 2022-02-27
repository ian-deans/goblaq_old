
export interface ChangeFn {
  (event: React.ChangeEvent<HTMLInputElement>): void;
}

export interface SubmitFn {
  (event: React.FormEvent<HTMLFormElement>): void;
}

export interface MutationPayload {
  variables: MutationVariables;
}

export interface MutationVariables {
  objects: any[];
}

export interface BusinessData {
  name: string;
  location: string;
  phoneNumber: string;
};