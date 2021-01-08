import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import style from './NavigationTop.module.css'

const NavigationTop = ( props ) => {
    const [deferredPrompt, setDeferredPrompt] = useState( null )

    useEffect( () => {
        if ( !navigator.standalone && !window.matchMedia( '(display-mode: standalone)' ).matches ) {
            window.addEventListener( 'beforeinstallprompt', ( e ) => {
                e.preventDefault()
                setDeferredPrompt( e )
            } )
        }

        return () => {
            if ( deferredPrompt ) {
            }
        }
    }, [deferredPrompt] )

    const handleInstall = () => {
        deferredPrompt.prompt()
    }

    return (
        <nav id="main-navigation" className={style.container}>
            <div className={style.inner}>
                {props.prevPage &&
                    <Link to={props.prevPage} className={style.back}>
                        <img src="/icons/chevron-left.svg" alt="back icon" />
                    </Link>
                }

                <div>
                    <h1 className={style.title}>{props.title}</h1>
                </div>

                <div className={style.actions}>
                    {deferredPrompt &&
                        <button className={style.install} onClick={handleInstall}>
                            <img src='/icons/download.svg' alt="download" />
                        </button>
                    }

                    <Link className={style.stairs} to="/category">
                        <span className={style.bar} />
                        <span className={style.bar} />
                        <span className={style.bar} />
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default NavigationTop