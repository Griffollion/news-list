import styles from './Chip.module.css'
import cn from 'classnames'

function Chip({ children, ...props }) {
    return (<div className={cn(styles.chip, {
        [styles.active]: props?.active
    })} {...props}>
        {children}
    </div>);
}

export default Chip;