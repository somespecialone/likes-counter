import type Base from 'deta/dist/types/base/base'

export function useDeta(): { base: Base } {
  // @ts-ignore
  return useNitroApp()._deta
}

export function makeKey(...slugs: string[]) {
  return slugs.join('::')
}
