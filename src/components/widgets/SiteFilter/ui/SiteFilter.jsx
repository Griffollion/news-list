import styles from './SiteFilter.module.css'
import {Chip} from 'components/shared/Chip';

function SiteFilter({...props}) {
    return (<div className={styles['site-filter']} {...props}>
        <Chip active={true}>Все</Chip>
        <Chip>RBK</Chip>
        <Chip>RIA</Chip>
        <Chip>KOMMERSANT</Chip>
    </div>);
}

export default SiteFilter;