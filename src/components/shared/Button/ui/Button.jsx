import cn from 'classnames'
import styles from './Button.module.css'

function Button({ block = false, appearance = "", children, ...props }) {
    return (
        <div className={cn(styles.button, {
            [styles[appearance]]: !!appearance,
            [styles.block]: block
        })} {...props}>
            {children}
        </div>
    );
}

export default Button;