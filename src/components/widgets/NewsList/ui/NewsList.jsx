import { useDispatch } from 'react-redux'
import styles from './NewsList.module.css'
import News from 'components/entities/News/ui/News'
import { addNews } from 'components/features/selectedNewsSlice'


function NewsList({ data }) {
    const dispatch = useDispatch()
    const handleClick = (data) => {
        dispatch(addNews(data))
    }
    return (
        <div className={styles['news-list']}>
            {data.map(i => <News data={i} key={i.id} onClick={() => handleClick(i)} />)}
        </div>
    );
}

export default NewsList;