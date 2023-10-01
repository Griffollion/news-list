import cn from 'classnames'
import styles from './Button.module.css'

function Button({ block = false, appearance = "", size="", children, ...props }) {
    return (
        <button className={cn(styles.button, {
            [styles[appearance]]: !!appearance,
            [styles.block]: block,
            [styles[size]]: !!size
        })} {...props}>
            {children}
        </button>
    );
}

export default Button;