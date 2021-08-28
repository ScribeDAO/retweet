import type { NextApiRequest, NextApiResponse } from 'next'
import Twitter from 'twitter-lite'

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY!,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET!,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY!,
  access_token_secret: process.env.TWITTER_ACCOUNT_TOKEN_SECRET!,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Process a POST request
  if (req.method === 'POST') {
    // Grab the tweetId from the request body
    const tweetId = JSON.parse(req.body).tweet_id
    // Retweet the tweet
    try {
      const result = await client.post('statuses/retweet', {
        id: tweetId.toString(),
      })
      res.status(200).json(result)
    } catch (err) {
      return res.status(500).json({ message: err.errors[0].message })
    }
  } else {
    res
      .status(400)
      .json({ message: 'Make a POST request to retweet a thread.' })
  }
}
