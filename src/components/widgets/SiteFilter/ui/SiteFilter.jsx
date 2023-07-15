import { useDispatch, useSelector } from 'react-redux';
import styles from './SiteFilter.module.css'
import { Chip } from 'components/shared/Chip';
import { filterNewsBySource, setActiveSource } from 'components/features/newsSlice'


function SiteFilter({ ...props }) {
    const dispatch = useDispatch()
    const activeSource = useSelector((state) => state.newsStore.activeSource)
    const handleClick = (sourse) => {
        dispatch(filterNewsBySource(sourse))
        dispatch(setActiveSource(sourse))
    }
    return (<div className={styles['filter-wrapper']} {...props}>
        <Chip size="l" onClick={() => handleClick('all')} active={activeSource === 'all'}>Все</Chip>
        <Chip size="l" onClick={() => handleClick('rbc.ru')} active={activeSource === 'rbc.ru'}>РБК</Chip>
        <Chip size="l" onClick={() => handleClick('ria.ru')} active={activeSource === 'ria.ru'}>РИА</Chip>
        <Chip size="l" onClick={() => handleClick('kommersant.ru')} active={activeSource === 'kommersant.ru'}>Коммерсант</Chip>
        <Chip size="l" onClick={() => handleClick('iz.ru')} active={activeSource === 'iz.ru'}>Известия</Chip>
        <Chip size="l" onClick={() => handleClick('1prime.ru')} active={activeSource === '1prime.ru'}>Прайм</Chip>
    </div>);
}

export default SiteFilter;