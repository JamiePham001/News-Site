// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NewsResponse } from '@/models/NewsArticle';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchQuery = req.query.q?.toString();

  // if no search query
  if (!searchQuery) {
    return res.status(400).json({error: "please provide a search query"})
  }

  // fetch search API 
  const response = await fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${process.env.NEWS_API_KEY}`);
  // return response in JSON format
  const newsResponse: NewsResponse = await response.json();

  res.status(200).json( newsResponse.articles);
}
