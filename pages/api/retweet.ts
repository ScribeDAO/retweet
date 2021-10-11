import type { NextApiRequest, NextApiResponse } from 'next'
import Twitter from 'twitter-lite'
import { fromGlobalId } from 'graphql-relay'
import prisma from '../../lib/db'

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
    const body = JSON.parse(req.body)

    // Grab the tweetId from the request body
    const tweetId = body.tweet_id as string
    const accessToken = body.access_token as string
    const { id: tagId } = fromGlobalId(body.category_id as string)
    const sessionUser = await prisma.session.findFirst({
      where: { accessToken },
    })

    if (!sessionUser) {
      return res.status(401).json({ message: 'Invalid access token' })
    }

    // store the post in DB
    try {
      await prisma.post.create({
        data: {
          tweetId: tweetId,
          author: {
            connect: {
              id: sessionUser!.userId,
            },
          },
          tags: {
            connect: [{ id: tagId }],
          },
        },
      })
    } catch (e: any) {
      return res.status(500).json({
        message: e.message,
      })
    }

    // Retweet the tweet
    try {
      await client.post('statuses/retweet', {
        id: tweetId.toString(),
      })
    } catch (e: any) {
      return res.status(500).json({
        message: e.errors[0].message || JSON.stringify(e),
      })
    }

    return res.status(200).json({ message: 'Success' })
  } else {
    res
      .status(400)
      .json({ message: 'Make a POST request to retweet a thread.' })
  }
}
