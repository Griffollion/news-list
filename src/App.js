
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import parsedNews from 'mock/data.json'
import { Menu } from 'components/widgets/Menu';
import { Container } from 'components/shared/Container';
import { Button } from 'components/shared/Button';
import { filterNewsByTime } from 'components/features/filterNewsByTime';
import { getAllNews, getTodaysNews} from 'components/features/newsSlice'
import { NewsList } from 'components/widgets/NewsList';
import { SiteFilter } from 'components/widgets/SiteFilter';

function App() {
  const dispatch = useDispatch()
  const allNews = useSelector((state) => state.newsStore.allNews)
  const todaysNews = useSelector((state) => state.newsStore.todaysNews)
  const selectedNews = useSelector((state) => state.selectedNews.data)


  useEffect(() => {
    dispatch(getAllNews(parsedNews.items))
    const todays = filterNewsByTime(parsedNews?.items, parsedNews?.updateDate)
    dispatch(getTodaysNews(todays))
  }, [])

  return (
    <BrowserRouter>

      <div className="App">
        <Container>

          <h1>Список новостей на {parsedNews?.updateDate} {parsedNews?.updateTime}</h1>
          <Menu />
          <SiteFilter />

          <Routes>
            <Route path="/news-list" element={<NewsList data={todaysNews} />} />
          </Routes>
          <Routes>
            <Route path="/news-list/all" element={<NewsList data={allNews} />} />
          </Routes>
        </Container>
        {!!selectedNews?.length && <div className='floating-button'>
          <div className='floating-button-wrapper'>
            <Button onClick={() => alert('Функционал находится в разработке')}>Сократить текст выбранных новостей</Button>
          </div>
        </div>}
      </div>
    </BrowserRouter>
  );
}

export default App;
