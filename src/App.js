
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
//import parsedNews from 'mock/data.json'
import { Menu } from 'components/widgets/Menu';
import { Container } from 'components/shared/Container';
import { Button } from 'components/shared/Button';
import { filterNewsByTime } from 'components/features/filterNewsByTime';
import { getAllNews, getTodaysNews, getParsedNews } from 'store/newsSlice'
import { NewsList } from 'components/widgets/NewsList';
import { SiteFilter } from 'components/widgets/SiteFilter';
import { TagsFilter } from 'components/widgets/TagsFilter';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import TgNewsList from 'components/widgets/TgNewsList/ui/TgNewsList';
import { Sugar } from 'react-preloaders';
import { getNewsFullTexts } from 'store/fullNewsTextSlice';
import { resetSelectedNews } from 'store/selectedNewsSlice';
import Loader from 'components/shared/Loader/ui/Loader';

function App() {
  const dispatch = useDispatch()
  const parsedNews = useSelector((state) => state.newsStore.parsedNews)
  const isNewsLoading = useSelector((state) => state.newsStore.loading)
  const allNews = useSelector((state) => state.newsStore.allNews)
  const todaysNews = useSelector((state) => state.newsStore.todaysNews)
  const selectedNews = useSelector((state) => state.selectedNews.data)
  const tgNews = useSelector((state) => state.processedNewsStore.tgNews)
  const loading = useSelector((state) => state.fullNewsTextsStore.loading)
  const newsFullTexts = useSelector((state) => state.fullNewsTextsStore.newsFullTexts)

  useEffect(() => {
    dispatch(getParsedNews())
  }, [])

  useEffect(() => {
    if (parsedNews?.items?.length > 0) {
      dispatch(getAllNews(parsedNews.items))
      const todays = filterNewsByTime(parsedNews?.items, parsedNews?.updateDate)
      dispatch(getTodaysNews(todays))
    }
  }, [dispatch, parsedNews])


  const handleNews = (data) => {
    dispatch(getNewsFullTexts(data))
    dispatch(resetSelectedNews())
  }

  return (
    <BrowserRouter>

      <div className="App">
        <Container>

          <Routes>
            <Route path="/news-list" element={
              <>
                <h1>Список новостей на {parsedNews?.updateDate} {parsedNews?.updateTime}</h1>

                <div className='subtitle'>Ресурсы</div>
                <SiteFilter />

                <div className='subtitle'>Теги</div>
                <TagsFilter />
                <Menu />
                <NewsList data={todaysNews} loading={isNewsLoading} />

                {<div className='floating-button'>
                  <div className='floating-button-wrapper'>
                    {loading === 'idle' && !!selectedNews?.length && <Button onClick={() => handleNews(selectedNews)}>Сделать выжимку выбранных новостей</Button>}
                    {loading === 'idle' && !selectedNews?.length && !!newsFullTexts?.length && <NavLink
                      to="/tg-news"
                    ><Button>
                        Посмотреть результат
                      </Button></NavLink>}
                    {loading === 'loading' && <Loader />}
                  </div>
                </div>}
              </>
            } />
          </Routes>
          <Routes>
            <Route path="/news-list/all" element={
              <>
                <h1>Список новостей на {parsedNews?.updateDate} {parsedNews?.updateTime}</h1>

                <div className='subtitle'>Ресурсы</div>
                <SiteFilter />

                <div className='subtitle'>Теги</div>
                <TagsFilter />
                <Menu />
                <NewsList data={allNews} loading={isNewsLoading} />

                {<div className='floating-button'>
                  <div className='floating-button-wrapper'>
                    {loading === 'idle' && !!selectedNews?.length && <Button onClick={() => handleNews(selectedNews)}>Сделать выжимку выбранных новостей</Button>}
                    {loading === 'idle' && !selectedNews?.length && !!newsFullTexts?.length && <NavLink
                      to="/tg-news"
                    ><Button>
                        Посмотреть результат
                      </Button></NavLink>}

                    {loading === 'loading' && <Loader />}
                  </div>
                </div>}
              </>
            } />
          </Routes>
          <Routes>
            <Route path="/tg-news" element={<TgNewsList />} />
          </Routes>
        </Container>

      </div>
    </BrowserRouter>
  );
}

export default App;
