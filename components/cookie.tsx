'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './cookie.module.css'
import wholeCookieImg from '../public/cookie-whole.png'
import rightCookieImg from '../public/cookie-right.png'
import leftCookieImg1 from '../public/cookie-left1.png'
import leftCookieImg2 from '../public/cookie-left2.png'

enum CookieState {
    Whole,
    Cracked,
    Open
}

export default function Cookie(props: { fortune: string }) {
    const [state, setState] = useState(CookieState.Whole);

    async function onClick() {
        switch (state) {
            case CookieState.Whole:
                setState(CookieState.Cracked);
                return;

            case CookieState.Cracked:
                setState(CookieState.Open);
                return;

            default:
                return;
        }
    }

    return (
        <div id={styles.cookiewrapper}>
            {state == CookieState.Whole && <Image src={wholeCookieImg} alt={'whole fortune cookie'} onClick={onClick}></Image>}
            {state != CookieState.Whole && 
            <div>
                <Image 
                    id={state == CookieState.Open && styles.left || ''} 
                    className={styles.cracked} src={leftCookieImg2} 
                    alt={'left half cracked fortune cookie'}
                    onClick={onClick}/>
                {state == CookieState.Open && 
                <div className={styles.fortune}>
                    <p className={styles.fortunetext}>{props.fortune}</p>
                    {/* <div className={styles.buttonwrapper}>
                        <button type="button" onClick={}>
                            another!
                        </button>
                    </div> */}
                </div>}
                <Image 
                    id={state == CookieState.Open && styles.left || ''} 
                    className={styles.cracked} src={leftCookieImg1} 
                    alt={'left half cracked fortune cookie'}
                    onClick={onClick}/>
                <Image 
                    id={state == CookieState.Open && styles.right || ''} 
                    className={styles.cracked}
                    src={rightCookieImg} 
                    alt={'right half cracked fortune cookie'}
                    onClick={onClick}/>
            </div>}
        </div>
    )
}