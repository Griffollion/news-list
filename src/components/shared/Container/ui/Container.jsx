import styles from './Container.module.css'
function Container({ children, ...props }) {
    return (
        <div className={styles.container} {...props}>
            {children}
        </div>
    );
}

export default Container;