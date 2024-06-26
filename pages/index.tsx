
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { NewsArticle, NewsResponse } from '@/models/NewsArticle'
import NewsArticleEntry from '@/components/NewsArticleEntry'
import NewsArticlesGrid from '@/components/NewsArticlesGrid'
import { Alert } from 'react-bootstrap'


// give type to breakingnewspageprops variable
interface BreakingNewsPageProps {
  newsArticles: NewsArticle[],
}

// fetching news api and return via json format
export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
  // await new Promise(r => setTimeout(r, 3000));
  // server side testing
  const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=" + process.env.NEWS_API_KEY);
  const newsResponse: NewsResponse = await response.json();
  return {
    props: {newsArticles: newsResponse.articles}
  }
  // let error go to 500 page
}

// generate page
export default function BreakingNewsPage({newsArticles} : BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title key='title'>Breaking News - NextJS News App</title>
      </Head>
      <main >
        <h1>Breaking News</h1>
        <Alert>
          This page uses <strong>getServerSideProps</strong> to fetch data server-side on every request, This aklows serach engines to crawl the page content and <strong>improve SEO</strong>.
        </Alert>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  )
}
