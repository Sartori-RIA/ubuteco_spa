export function compare(a: number | string | undefined, b: number | string | undefined, isAsc: boolean): number {
  if (!a || !b) {
    return 1;
  }
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function toFormData<T>( formValue: T ) {
  const formData = new FormData();

  for ( const key of Object.keys(formValue) ) {
    // @ts-ignore
    const value: any = formValue[key];
    formData.append(key, value);
  }

  return formData;
}
