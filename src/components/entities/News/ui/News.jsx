import cn from "classnames";
import styles from './News.module.css'
import { useSelector } from 'react-redux'

function News({data, ...props}) {
    const selectedNews = useSelector((state) => state.selectedNews.data)
    return (
        <div className={cn(styles.news, {
            [styles.active]: selectedNews.find(i => i === data.id)
        })} {...props}>
            {data?.title && <div className={styles['news-title']}>
                {data.title}
            </div>}

            {data?.link && <div className={styles.link}>
                <a href={data.link} target="_blank" onClick={(e) => e.stopPropagation()}>Читать полную новость</a>
            </div>}

            <div className={styles.footer}>
                <div className={styles.source}>
                    {data?.source}
                </div>

                <div className={styles['publication-time']}>
                    {data?.publicationTime}
                </div>
            </div>
        </div>
    );
}

export default News;