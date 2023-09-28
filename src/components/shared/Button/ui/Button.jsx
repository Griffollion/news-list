import cn from 'classnames'
import styles from './Button.module.css'

function Button({ block = false, appearance = "", children, ...props }) {
    return (
        <button className={cn(styles.button, {
            [styles[appearance]]: !!appearance,
            [styles.block]: block
        })} {...props}>
            {children}
        </button>
    );
}

export default Button;