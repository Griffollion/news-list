import cn from "classnames";
import styles from './ProcessedNews.module.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from "react";

function ProcessedNews({ data, ...props }) {

    const [tooltipContent, setTooltipContent] = useState('Текст скопирован');
    const [visible, setVisible] = useState(false);

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const handleTextCopy = () => {
        show()
        setTimeout(() => {
            hide()
        }, 1500)
    }

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


                <Tippy content={tooltipContent} visible={visible} onClickOutside={hide}>
                    <div>
                        <CopyToClipboard text={data?.text}
                            onCopy={() => handleTextCopy()}>

                            <div className={styles['copy']}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#6B737D" d="M53.98 9.143h-3.97c-.082 0-.155.028-.232.047V5.023C49.778 2.253 47.473 0 44.64 0H10.217C7.384 0 5.08 2.253 5.08 5.023v46.843c0 2.77 2.305 5.023 5.138 5.023h6.037v2.268c0 2.67 2.216 4.843 4.941 4.843H53.98c2.725 0 4.942-2.173 4.942-4.843v-45.17c0-2.671-2.217-4.844-4.942-4.844zM7.11 51.866V5.023c0-1.649 1.394-2.991 3.106-2.991H44.64c1.712 0 3.106 1.342 3.106 2.99v46.844c0 1.649-1.394 2.991-3.106 2.991H10.217c-1.712 0-3.106-1.342-3.106-2.99zm49.778 7.29c0 1.551-1.306 2.812-2.91 2.812H21.195c-1.604 0-2.91-1.26-2.91-2.811v-2.268H44.64c2.833 0 5.138-2.253 5.138-5.023V11.128c.077.018.15.047.233.047h3.968c1.604 0 2.91 1.26 2.91 2.811v45.17z" /><path fill="#6B737D" d="M38.603 13.206H16.254a1.015 1.015 0 1 0 0 2.032h22.35a1.015 1.015 0 1 0 0-2.032zM38.603 21.333H16.254a1.015 1.015 0 1 0 0 2.032h22.35a1.015 1.015 0 1 0 0-2.032zM38.603 29.46H16.254a1.015 1.015 0 1 0 0 2.032h22.35a1.015 1.015 0 1 0 0-2.032zM28.444 37.587h-12.19a1.015 1.015 0 1 0 0 2.032h12.19a1.015 1.015 0 1 0 0-2.032z" /></svg>
                            </div>

                        </CopyToClipboard>
                    </div>
                </Tippy>

            </div>
        </div >
    );
}

export default ProcessedNews;