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
    return (<div className={styles['site-filter']} {...props}>
        <Chip onClick={() => handleClick('all')} active={activeSource === 'all'}>Все</Chip>
        <Chip onClick={() => handleClick('rbc.ru')} active={activeSource === 'rbc.ru'}>RBK</Chip>
        <Chip onClick={() => handleClick('ria.ru')} active={activeSource === 'ria.ru'}>RIA</Chip>
        <Chip onClick={() => handleClick('kommersant.ru')} active={activeSource === 'kommersant.ru'}>KOMMERSANT</Chip>
    </div>);
}

export default SiteFilter;