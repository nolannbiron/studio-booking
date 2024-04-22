import { Sentiment } from '@repo/prisma/enums'
import type { TSentimentResponse, TServerApiSentimentResponse } from '@repo/schemas/contact'

import { HUGGING_FACE_API_KEY } from '../../constants'

const formatSentimentFromResponse = (response: TServerApiSentimentResponse): TSentimentResponse => {
	let label: Sentiment

	switch (response.label) {
		case 'LABEL_0':
			label = Sentiment.NEGATIVE
			break
		case 'LABEL_1':
			label = Sentiment.NEUTRAL
			break
		case 'LABEL_2':
			label = Sentiment.POSITIVE
			break
	}

	return {
		label,
		score: response.score
	}
}

export class AiRepository {
	protected static async querySentimentApi(input: string) {
		return fetch(
			'https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment',
			{
				headers: { Authorization: `Bearer ${HUGGING_FACE_API_KEY}` },
				method: 'POST',
				body: JSON.stringify({ inputs: input })
			}
		).then((response) => response.json()) as Promise<
			TServerApiSentimentResponse[][] | { error: string; warnings: string[] }
		>
	}

	static async fetchSentiment(input: string): Promise<TSentimentResponse> {
		const response = await this.querySentimentApi(input)

		if ('error' in response) {
			throw 'Error fetching sentiment'
		}

		return formatSentimentFromResponse(response[0][0])
	}
}
