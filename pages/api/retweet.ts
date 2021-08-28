import type { NextApiRequest, NextApiResponse } from 'next'
import Twitter from 'twitter-lite'

// For some weird reason we need `toString` env variables strings
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY!.toString(),
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET!.toString(),
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY!.toString(),
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET!.toString(),
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
