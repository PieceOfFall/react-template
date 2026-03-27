
export function getHref(origin:string,redirectTo?: string | null | undefined) {
    return `${origin}${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`
}