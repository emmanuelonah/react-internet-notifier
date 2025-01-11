export function composeClassNames<T = string>(...classNames: T[]) {
  return classNames.filter(Boolean).join(' ');
}
