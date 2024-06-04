import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle } from "@/models/NewsArticle";
import Head from 'next/head';
import { FormEvent, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";

const SearchNewsPage = () => {
    const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(null);
    const [searchResultLoading, setSearchResultsLoading] = useState(false);
    const [searchResultIsError, setSearchResultsIsError] = useState(false);

    // handle input on submit
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const searchQuery = formData.get("searchQuery")?.toString().trim();

        // on submit set variables
        if (searchQuery) {
            try {
                setSearchResults(null);
                setSearchResultsIsError(false);
                setSearchResultsLoading(true);
                const response = await fetch('/api/search-news?q=' + searchQuery);
                const articles: NewsArticle[] = await response.json();
                setSearchResults(articles);
            } catch (error) {
                console.error(error);
                setSearchResultsIsError(true);
            } finally {
                setSearchResultsLoading(false);
            }
        }
    }

    return (
        <>
        <Head key="title">
            <title>Search News - NextJS News App</title>
        </Head>
            <main>
                <h1>Search News</h1>
                <Alert>
                    This page uses <strong>client-side data fetching</strong> to show fresh data for every search. Requests are handled by our backend via <strong>API routes</strong>.
                </Alert>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="search-input">
                        <Form.Label>Search query</Form.Label>
                        <Form.Control 
                        name="searchQuery"
                        placeholder="E.g. politics, sports, ..."
                        />
                    </Form.Group>
                <Button type="submit" className="mb-3" disabled={searchResultLoading}>
                    Search
                </Button>
                </Form>
                <div className="d-flex flex-column align-items-center">
                    {searchResultLoading && <Spinner animation ="border" />}
                    {searchResultIsError && <p>Something went wrong. Please try again.</p>}
                    {searchResults?.length === 0 && <p>Nothing found. try a different query.</p>}
                    {searchResults && <NewsArticlesGrid articles={searchResults} />}
                </div>
            </main>
        </>
        
    );
}

export default SearchNewsPage;