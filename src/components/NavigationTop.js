import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

import style from './NavigationTop.module.css'

const NavigationTop = ( props ) => {
    const history = useHistory()
    const [deferredPrompt, setDeferredPrompt] = useState( null )
    const [showBackButton, setShowBackButton] = useState( false )

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

    useEffect( () => {
        setShowBackButton( history.location.pathname !== '/' )
    }, [history.location.pathname] )

    const handleInstall = () => {
        deferredPrompt.prompt()
    }

    return (
        <nav id="main-navigation" className={style.container}>
            <div className={style.inner}>
                {showBackButton &&
                    <button onClick={() => history.goBack()} className={style.back}>
                        <img src="/icons/chevron-left.svg" alt="back icon" />
                    </button>
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

                    <button className={style.stairs} onClick={() => history.location.pathname !== '/category' ? history.push('/category') : null}>
                        <span className={style.bar} />
                        <span className={style.bar} />
                        <span className={style.bar} />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavigationTop