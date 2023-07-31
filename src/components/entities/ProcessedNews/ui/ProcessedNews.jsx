import cn from "classnames";
import styles from './ProcessedNews.module.css'
function ProcessedNews({data, ...props}) {
    return (
        <div className={cn(styles.news, {
            [styles.active]: false
        })} {...props}>
            {/* {data?.title && <div className={styles['news-title']}>
                {data.title}
            </div>} */}

            {data?.text && <div className={styles['news-title']}>
                {data.text}
            </div>}

            {data?.link && <div className={styles.link}>
                <a href={data.link} target="_blank" onClick={(e) => e.stopPropagation()}>Читать новость источника</a>
            </div>}

            <div className={styles.footer}>
                <div className={styles['tags-wrapper']}>
                    <div className={styles.source}>
                        {data?.source}
                    </div>
                    {data?.tag && <div className={styles.tag}>
                        {data.tag}
                    </div>}
                </div>
               

                <div className={styles['publication-time']}>
                    {data?.publicationTime}
                </div>
            </div>
        </div>
    );
}

export default ProcessedNews;