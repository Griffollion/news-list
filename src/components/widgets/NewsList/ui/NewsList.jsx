import { useDispatch } from 'react-redux'
import styles from './NewsList.module.css'
import News from 'components/entities/News/ui/News'
import { addNews } from 'store/selectedNewsSlice'


function NewsList({ data, loading }) {
    const dispatch = useDispatch()
    const handleClick = (data) => {
        dispatch(addNews(data))
    }
    return (
        <>
            {!!data?.length && <div className={styles['news-list']}>
                {data.map(i => <News data={i} key={i.id} onClick={() => handleClick(i)} />)}
            </div>}
            {!data?.length && loading !== 'loading' && <div>Новостей нет</div>}
            {loading === 'loading' && <div>Загрузка новостей...</div>}
        </>
    );
}

export default NewsList;