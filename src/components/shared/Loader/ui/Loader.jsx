import styles from './Loader.module.css'
import cn from 'classnames'

function Loader() {
    return (
        <div className={styles.loader}>
            <div className={styles.base}>
                    <div className={cn(styles.circ, styles['circ-1'])}></div>
                    <div className={cn(styles.circ, styles['circ-2'])}></div>
                    <div className={cn(styles.circ, styles['circ-3'])}></div>
                    <div className={cn(styles.circ, styles['circ-4'])}></div>
                    <div className={cn(styles.circ, styles['circ-5'])}></div>
                    <div className={cn(styles.circ, styles['circ-6'])}></div>
                    <div className={cn(styles.circ, styles['circ-7'])}></div>
                    <div className={cn(styles.circ, styles['circ-8'])}></div>
                    <div className={cn(styles.circ, styles['circ-9'])}></div>
                    <div className={cn(styles.circ, styles['circ-10'])}></div>
                    <div className={cn(styles.circ, styles['circ-11'])}></div>
                    <div className={cn(styles.circ, styles['circ-12'])}></div>
                    <div className={cn(styles.circ, styles['circ-13'])}></div>
                    <div className={cn(styles.circ, styles['circ-14'])}></div>
                    <div className={cn(styles.circ, styles['circ-15'])}></div>
            </div>
        </div>
    );
}

export default Loader;