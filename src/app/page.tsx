import Link from 'next/link';

import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <Link href="/">Home</Link>
        </div>

        <div>
          <Link href="/admin/users" className={styles.card}>
            <p>Users list</p>
          </Link>
        </div>

        <div>
          <Link href="/admin/sites" className={styles.card}>
            <p>Sites list</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
