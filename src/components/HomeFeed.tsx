import { useEffect, useState } from 'react';
import { mostViewedArticles } from '../api';
import { Article } from '../types';

const months = [
  {value: 1, display: "Jan"}, 
  {value: 2, display: "Feb"}, 
  {value: 3, display: "Mar"},
  {value: 4, display: "Apr"}, 
  {value: 5, display: "May"}, 
  {value: 6, display: "Jun"},
  {value: 7, display: "Jul"}, 
  {value: 8, display: "Aug"}, 
  {value: 9, display: "Sept"},
  {value: 10, display: "Oct"}, 
  {value: 11, display: "Nov"}, 
  {value: 12, display: "Dec"},
];

function HomeFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(months[0].value);
  const [error, setError] = useState(false);
   
  useEffect(() => {
    const fetchData = async () => {
      const data = await mostViewedArticles("2023", selectedMonth);
      if (data.length > 0) {
        // const sortedData = data.sort((a: Article, b: Article) => a.article.localeCompare(b.article));
        const sortedData = data.sort((a: Article, b: Article) => b.views - a.views);
        setArticles(sortedData);
        setError(false);
      } else {
        setError(true);
      } 
    }
    fetchData();
  }, [selectedMonth])

  return (
    // React Fragment
    <>
      <div className='feed-header'>Home Feed</div>
      <select
        value={selectedMonth}
        onChange={e => setSelectedMonth(parseInt(e.target.value))}
      >
        {
          months.map((month) => (
            <option key={month.value} value={month.value}>{month.display}</option>
          ))
        }
      </select>
      {
        error ? <div>Error fetching data</div> :
        articles.map((article: Article) => (
          <div key={article.article} className='article-item'>
            <div>{article.displayName}</div>
            <div>{article.views}</div>
            <a href={`https://en.wikipedia.org/wiki/${article.article}`} target="_blank">View Article</a>
          </div>
        ))
      }
    </>
  )
}

export default HomeFeed;