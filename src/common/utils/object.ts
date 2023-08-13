// Provides a method with typed keys for Object.keys
export function objectKeys<K extends PropertyKey>(
  object: Record<K, unknown>
): Array<K> {
  return Object.keys(object) as Array<K>
}
