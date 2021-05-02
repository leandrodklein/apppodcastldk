import styles from './styles.module.scss';

import { Headphones, Shuffle, SkipBack, Play, SkipForward, Repeat } from 'react-feather';

export function Player() {
    return (
        <div className={styles.playerContainer}>
            <header >
                <Headphones size="25" color="orange" />
                <strong>Tocando agora</strong>
            </header>

            <div className={styles.emptyPlayer}>
                <strong>Selecione uma música pra ouvir</strong>
            </div>

            <footer className={styles.empty}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        <div className={styles.emptySlider} />
                    </div>                    
                    <span>00:00</span>
                </div>

                <div className={styles.buttons}>
                    <button type="button">
                        <Shuffle />
                    </button>
                    <button type="button">
                        <SkipBack />
                    </button>
                    <button type="button" className={styles.playButton} >
                        <Play />
                    </button>
                    <button type="button">
                        <SkipForward />
                    </button>
                    <button type="button">
                        <Repeat />
                    </button>
                </div>
            </footer>
        </div>
    );
}