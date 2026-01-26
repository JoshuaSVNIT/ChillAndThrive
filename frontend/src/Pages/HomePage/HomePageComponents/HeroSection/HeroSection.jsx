import { Link } from 'react-router';

import styles from './HeroSection.module.css';



export function HeroSection() {
    return (

        <div className={styles['home-page-hero-section-container']}>

            <div className={styles["hero-section-glass-container"]}>


                <div className={styles["hero-section-text"]}>
                    <div className={styles['upar-wala-text']}>
                        <p>Welcome to</p>
                    </div>
                    <div className={styles['title-text']}>
                        <h1 >Chill thrive</h1>
                    </div>

                    <div className={styles['secondary-text']}>

                        <p>Rejuvenate your body. Reset your mind.</p>

                    </div>

                </div>


                <div className={styles['home-page-hero-buttons-container']}>
                    <Link to="/booking">
                        <button className={styles['home-page-hero_button']} >Book a session</button>
                    </Link>
                    <Link to="/services">
                        <button className={styles['home-page-hero_button']}>Explore services</button>
                    </Link>

                </div>
            </div>






        </div >
    )
}