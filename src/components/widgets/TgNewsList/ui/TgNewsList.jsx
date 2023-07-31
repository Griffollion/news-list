import { useDispatch, useSelector } from 'react-redux'
import styles from './TgNewsList.module.css'
import ProcessedNews from 'components/entities/ProcessedNews/ui/ProcessedNews'
import { useEffect } from 'react'
import { getTgNews } from 'store/processedNewsSlice'
import { Button } from 'components/shared/Button'
import { useNavigate } from 'react-router-dom';


function TgNewsList({ loading }) {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.processedNewsStore.tgNews)

    useEffect(() => {
        dispatch(getTgNews())
    }, [])

    const navigate = useNavigate();

    function handleClick() {
        navigate(-1);
    }
    return (
        <>
            <h1>Выжимка новостей для Telegram</h1>

            <div>
                <Button onClick={handleClick} >На страницу всех новостей</Button>
            </div>
            {!!data?.length && <div className={styles['news-list']}>
                {data.map(i => <ProcessedNews data={i} key={i.id} />)}
            </div>}
            {!data?.length && loading !== 'loading' && <div>Новостей нет</div>}
            {loading === 'loading' && <div>Загрузка новостей...</div>}
        </>
    );
}

export default TgNewsList;