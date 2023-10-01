import React from 'react';
import styles from './Main.module.css'
import { NavLink } from 'react-router-dom';
import {ReactComponent as NalIcon} from 'images/icons/nal.svg'
import {GLOBAL_BREAKPOINTS} from "components/shared/helpers/constants";
import {Button} from "components/shared/Button";
import useBreakpoint from "use-breakpoint";

const BREAKPOINTS = GLOBAL_BREAKPOINTS

const Main = () => {
    const { breakpoint } = useBreakpoint(BREAKPOINTS, 'mobile')
    return (
        <>
            <div className={styles['wrapper']}>
                <div className={styles['title']}>
                    NAL.BY
                </div>
                <div className={styles['logo']}>
                    <NalIcon/>
                </div>
                <div className={styles['btn-wrapper']}>
                    <NavLink to="/news-list">
                        <Button size={breakpoint === "mobile" ? '': "l"}>К списку сегодняшних новостей</Button>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default Main;