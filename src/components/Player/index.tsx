import { useContext, useRef, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { PlayerContext } from '../../contexts/PlayerContext';

import styles from './styles.module.scss';

import { Headphones, Shuffle, SkipBack, Play, SkipForward, Repeat, Pause } from 'react-feather';

export function Player() {
    const audioRef = useRef<HTMLAudioElement>(null);

    const {episodeList, currentEpisodeIndex, isPlaying, togglePlay, setPlayingState } = useContext(PlayerContext);

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }

        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }        
    }, [isPlaying])

    const episode = episodeList[currentEpisodeIndex];

    return (
        <div className={styles.playerContainer}>
            <header >
                <Headphones size="25" color="orange" />
                <strong>Tocando agora</strong>
            </header>

            { episode ? (
                <div className={styles.currentEpisode}>
                    <Image 
                        width={592} 
                        height={592} 
                        src={episode.thumbnail} 
                        objectFit="cover" 
                    />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </div>                
            ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione uma música pra ouvir</strong>
                </div>
            )}

            <footer className={!episode ? styles.empty:''}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        {episode ? (
                            <Slider 
                                trackStyle={{ backgroundColor: '#3FAA9E' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#3Daa9e', borderWidth: 4 }}
                            
                            />
                        ) : (
                            <div className={styles.emptySlider} />
                        )}
                    </div>                    
                    <span>00:00</span>
                </div>

                { episode && (
                    <audio 
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                    />
                )}

                <div className={styles.buttons}>
                    <button type="button" disabled={!episode}>
                        <Shuffle />
                    </button>
                    <button type="button" disabled={!episode}>
                        <SkipBack />
                    </button>
                    <button type="button" 
                        className={styles.playButton} 
                        disabled={!episode}
                        onClick={togglePlay}
                    >
                        { isPlaying 
                            ? <Pause /> 
                            : <Play />}
                    </button>
                    <button type="button" disabled={!episode}>
                        <SkipForward />
                    </button>
                    <button type="button" disabled={!episode}>
                        <Repeat />
                    </button>
                </div>
            </footer>
        </div>
    );
}