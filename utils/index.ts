import { H3Event } from 'h3'

export function useDeta(event: H3Event) {
  return event.context.deta
}

export function makeKey(...slugs: string[]) {
  return slugs.join('::')
}
