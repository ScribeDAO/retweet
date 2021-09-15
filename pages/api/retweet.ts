import type { NextApiRequest, NextApiResponse } from 'next'
import Twitter from 'twitter-lite'
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
    const tagId = body.category_id as string
    const sessionUser = await prisma.session.findFirst({
      where: { accessToken },
    })

    if (!sessionUser) {
      return res.status(401).json({ message: 'Invalid access token' })
    }

    try {
      // we put this in a transaction since all these actions must succeed for this to write to the db
      await prisma.$transaction([
        // store the post in DB
        prisma.post.create({
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
        }),
        // Retweet the tweet
        await client.post('statuses/retweet', {
          id: tweetId.toString(),
        }),
      ])

      return res.status(200).json({ message: 'Success' })
    } catch (e: any) {
      return res.status(500).json({
        // I wish error objects were consistent :|
        message: e.message || e.errors[0].message || JSON.stringify(e),
      })
    }
  } else {
    res
      .status(400)
      .json({ message: 'Make a POST request to retweet a thread.' })
  }
}
