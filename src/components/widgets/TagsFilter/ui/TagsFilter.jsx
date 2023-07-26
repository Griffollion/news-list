import { useDispatch, useSelector } from 'react-redux';
import styles from './TagsFilter.module.css'
import { Chip } from 'components/shared/Chip';
import { filterNewsByTag, setActiveTag } from 'components/features/newsSlice'


function TagsFilter({ ...props }) {
    const dispatch = useDispatch()
    const activeTag = useSelector((state) => state.newsStore.activeTag)
    const handleClick = (sourse) => {
        dispatch(filterNewsByTag(sourse))
        dispatch(setActiveTag(sourse))
    }
    return (<div className={styles['filter-wrapper']} {...props}>
        <Chip size="s" onClick={() => handleClick('all')} active={activeTag === 'all'}>Все</Chip>
        <Chip size="s" onClick={() => handleClick('finances')} active={activeTag === 'finances'}>Финансы</Chip>
        <Chip size="s" onClick={() => handleClick('economics')} active={activeTag === 'economics'}>Экономика</Chip>
        <Chip size="s" onClick={() => handleClick('business')} active={activeTag === 'business'}>Бизнесс</Chip>
    </div>);
}

export default TagsFilter;