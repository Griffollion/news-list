import { useDispatch, useSelector } from 'react-redux'
import styles from './TgNewsList.module.css'
import ProcessedNews from 'components/entities/ProcessedNews/ui/ProcessedNews'
import { useEffect } from 'react'
import { getTgNews } from 'store/processedNewsSlice'
import { Button } from 'components/shared/Button'
import { useNavigate } from 'react-router-dom';


function TgNewsList({ loading }) {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.processedNewsStore.tgNews)

    useEffect(() => {
        dispatch(getTgNews())
    }, [])

    const navigate = useNavigate();

    function handleClick() {
        navigate(-1);
    }
    return (
        <>
            <h1>Рерайтнутая новость</h1>

            <div className={styles.mb20}>
                <Button onClick={handleClick} appearance='ghost'> 
                <span style={{"paddingRight": "5px"}}>
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="arrow">
                        <g id="Rounded Rectangle 33 copy 4">
                        <path id="Vector" d="M2.99103 8.91127L11.5254 0.424726C12.0917 -0.141575 13.009 -0.141575 13.5753 0.424726C14.1416 0.991027 14.1416 1.9003 13.5753 2.45862L5.99003 9.99601L13.5753 17.5414C14.1416 18.1077 14.1416 19.0169 13.5753 19.5753C13.009 20.1416 12.0917 20.1416 11.5254 19.5753L2.99103 11.0887C2.68794 10.7856 2.55234 10.3868 2.57627 9.99601C2.55234 9.60518 2.68794 9.20638 2.99103 8.91127Z" fill="#000"/>
                        </g>
                        </g>
                    </svg>
                </span>

                На страницу всех новостей
                </Button>
            </div>
            {!!data?.length && <div className={styles['news-list']}>
                {data.map(i => <ProcessedNews data={i} key={i.id} />)}
            </div>}
            {!data?.length && loading !== 'loading' && <div>Новостей нет</div>}
            {loading === 'loading' && <div>Загрузка новостей...</div>}
        </>
    );
}

export default TgNewsList;