
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import parsedNews from 'mock/data.json'
import { Menu } from 'components/widgets/Menu';
import { Container } from 'components/shared/Container';
import { Button } from 'components/shared/Button';
import { filterNewsByTime } from 'components/features/filterNewsByTime';
import { NewsList } from 'components/widgets/NewsList';
import { SiteFilter } from 'components/widgets/SiteFilter';

function App() {
  const selectedNews = useSelector((state) => state.selectedNews.data)
  const [news, setNews] = useState(parsedNews.items)

  useEffect(() => {
    const filtratedNews = filterNewsByTime(news, parsedNews?.updateDate)
    setNews(filtratedNews)
  }, [])

  return (
    <BrowserRouter>

      <div className="App">
        <Container>
        
          <h1>Список новостей на {parsedNews?.updateDate} {parsedNews?.updateTime}</h1>
          <Menu />
          <SiteFilter/>

          <Routes>
            <Route path="news-list" element={<NewsList data={news} />} />
          </Routes>
          <Routes>
            <Route path="news-list/all" element={<NewsList data={parsedNews.items} />} />
          </Routes>
        </Container>
        {!!selectedNews?.length && <div className='floating-button'>
          <div className='floating-button-wrapper'>
            <Button onClick = {() => alert('Функция временно недоступна.')}>Сократить текст выбранных новостей</Button>
          </div>
        </div>}
      </div>
    </BrowserRouter>
  );
}

export default App;
