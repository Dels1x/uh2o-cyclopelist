import Layout from "../../components/layout";
import {getAllPlayerNames, getPlayerData} from "../../lib/players";
import styles from "../../styles/Player.module.css";
import Image from "next/image";

export default function Player({player}) {
    return (
        <Layout className={styles.main}>
            <div className={styles.profile}>
                <h1 className={styles.profileTitle}>{player.name}'s profile:</h1>
                <div className={styles.playerInfo}>
                    <div className={styles.hardest}>Hardest: {player.levelsCompleted[0]}</div>
                    <div>Cyclope eyes: {player.points}</div>
                    <div><Image src="/images/cyclope-eye.png" alt="Глаз Циклопа" width={40} height={40}/></div>
                </div>
                <h1 className={styles.beatenTitle}>Beaten cyclopes:</h1>
                <div className={styles.levelsCompleted}>
                    {player.levelsCompleted.map((level, i) => (
                        <div key={i}>
                            {level.points >= 100? (<b>{level}</b>) : (level)}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export function getStaticPaths() {
    const paths = getAllPlayerNames();

    console.log("paths: " + JSON.stringify(paths, null, 2));

    return {
        paths,
        fallback: false
    };
}

export function getStaticProps({params}) {
    const player = getPlayerData(params.player);

    console.log("The player = " + JSON.stringify(player));

    return {
        props: {
            player,
        },
    };
}