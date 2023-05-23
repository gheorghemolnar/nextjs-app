import React from 'react';
import Link from 'next/link';

import styles from '../app/page.module.css';

export default function Navbar() {
  return (
    <header style={{ background: 'red' }}>
      <nav>
        <Link href="/" rel="noopener noreferrer">
          Home
        </Link>
        <Link href="admin/users" className={styles.card}>
          <p>Users list</p>
        </Link>
        <Link href="admin/sites" className={styles.card}>
          <p>Sites list</p>
        </Link>
      </nav>
    </header>
  );
}
