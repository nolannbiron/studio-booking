export function isEmojiString(input: string): boolean {
	const onlyEmojis = [...input?.trim()].every((char) => isEmoji(char))
	return onlyEmojis
}

function isEmoji(char: string): boolean {
	const regex_emoji = /[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]+/gu

	if (char.match(regex_emoji)) {
		return true
	}

	return false
}
