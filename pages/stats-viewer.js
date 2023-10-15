import Layout from "../components/layout";
import {getAllPlayers} from "../lib/players";
import styles from "../styles/Stats.module.css";
import Link from "next/link";
import Image from "next/image";

export default function StatsViewer({players}) {
    return (
        <Layout>
            <main className={styles.main}>
                <h1>Greatest cyclopeslayers:</h1>
                <ul className={styles.playersList}>
                    {players.map(({name, points}, index) => (
                        <li key={name}><Link href={`/players/${name}`}>
                            <div className={styles.player}>
                                <div>#{++index} - {name}: {points}</div>
                                <div><Image src="/images/cyclope-eye.png" alt="Глаз Циклопа" width={40} height={40}/></div>
                            </div>
                        </Link></li>
                    ))}
                </ul>
            </main>
        </Layout>
    );
}

export function getStaticProps() {
    const players = getAllPlayers();
    console.log("players: " + JSON.stringify(players, null, 2));

    return {
        props: {
            players
        },
    };
}