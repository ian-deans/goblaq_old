
export interface ChangeFn {
  (event: React.ChangeEvent<HTMLInputElement>): void;
}

export interface SubmitFn {
  (event: React.FormEvent<HTMLFormElement>): void;
}