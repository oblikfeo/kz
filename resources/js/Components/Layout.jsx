import { Link } from '@inertiajs/react';

export default function Layout({ children, auth }) {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <Link href="/" style={styles.logo}>
                        Мой Проект
                    </Link>
                    <nav style={styles.nav}>
                        {auth?.user ? (
                            <>
                                <Link href="/dashboard" style={styles.navLink}>
                                    Личный кабинет
                                </Link>
                                <Link href="/profile" style={styles.navLink}>
                                    Профиль
                                </Link>
                                <Link href="/logout" method="post" style={styles.logoutButton}>
                                    Выйти
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login" style={styles.navLink}>
                                    Вход
                                </Link>
                                <Link href="/register" style={styles.registerButton}>
                                    Регистрация
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>
            <main style={styles.main}>
                {children}
            </main>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
    },
    headerContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#007bff',
        textDecoration: 'none',
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    navLink: {
        color: '#333',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'color 0.2s',
    },
    registerButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'background-color 0.2s',
    },
    logoutButton: {
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'background-color 0.2s',
    },
    main: {
        flex: 1,
    },
};

