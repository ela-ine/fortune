'use client';

import { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Image from 'next/image';
import styles from './cookie.module.css'
import wholeCookieImg from '../public/cookie-whole.png'
import rightCookieImg from '../public/cookie-right.png'
import fortuneImg from '../public/fortune.png'
import leftCookieImg1 from '../public/cookie-left1.png'
import leftCookieImg2 from '../public/cookie-left2.png'

enum CookieState {
    Whole,
    Cracked,
    Open
}

export default function Cookie(props: { fortune: string }) {
    const [state, setState] = useState(CookieState.Whole);

    useEffect(() => {console.log(state)}, [state])

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
                <div>
                    <p className={styles.fortunetext}>{props.fortune}</p>
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