declare type LocalizedEmail<T> = T & {
	t: typeof import('@repo/i18n/emails').default.t
}
