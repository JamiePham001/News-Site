import { NewsArticle } from "@/models/NewsArticle";
import { Col, Row } from "react-bootstrap";
import NewsArticleEntry from "./NewsArticleEntry";

interface NewsArticlesGridProps {
    articles: NewsArticle[],
}


// generate grids 
const NewsArticleGrid = ({articles} : NewsArticlesGridProps) => {
    return (
        <Row xs={1} sm={2} xl={3} className="g-4">
            {articles.map(article => (
                <Col key={article.url}>
                    < NewsArticleEntry article={article} />
                </Col>
            ))}
        </Row>
    );
}

export default NewsArticleGrid;