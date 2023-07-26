import styles from './Chip.module.css'
import cn from 'classnames'

function Chip({ children,size, ...props }) {
    return (<div className={cn(styles.chip, {
        [styles.active]: props?.active,
        [styles.s]: size === "s",
        [styles.l]: size === "l",
    })} {...props}>
        {children}
    </div>);
}

export default Chip;