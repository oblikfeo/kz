import Layout from '../Components/Layout';
import BuyerBoard from '../Components/BuyerBoard';
import SellerBoard from '../Components/SellerBoard';

export default function Welcome({ auth, orders = [], message }) {
    const isBuyer = auth?.user?.role === 'buyer';
    const isSeller = auth?.user?.role === 'seller';

    return (
        <Layout auth={auth}>
            {!auth?.user ? (
                <div style={styles.hero}>
                    <div style={styles.content}>
                        <h1 style={styles.title}>Добро пожаловать!</h1>
                        <p style={styles.subtitle}>
                            {message || 'Это ваш новый проект на Laravel + React + InertiaJS'}
                        </p>
                        <div style={styles.actions}>
                            <a href="/register" style={styles.primaryButton}>
                                Начать
                            </a>
                            <a href="/login" style={styles.secondaryButton}>
                                Войти
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={styles.container}>
                    <div style={styles.header}>
                        <h1 style={styles.title}>
                            {isBuyer ? '🛒 Доска объявлений' : '🏪 Доска объявлений'}
                        </h1>
                        <p style={styles.subtitle}>
                            {isBuyer 
                                ? 'Просматривайте доступные заказы или создавайте свои' 
                                : 'Просматривайте и принимайте заказы от покупателей'}
                        </p>
                    </div>

                    {isBuyer && <BuyerBoard orders={orders} />}
                    {isSeller && <SellerBoard orders={orders} />}
                </div>
            )}
        </Layout>
    );
}

const styles = {
    hero: {
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
    },
    content: {
        textAlign: 'center',
        maxWidth: '600px',
    },
    title: {
        fontSize: '48px',
        fontWeight: '700',
        color: '#333',
        margin: '0 0 20px 0',
    },
    subtitle: {
        fontSize: '20px',
        color: '#666',
        margin: '0 0 40px 0',
        lineHeight: '1.6',
    },
    actions: {
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
    },
    primaryButton: {
        padding: '14px 32px',
        fontSize: '18px',
        fontWeight: '600',
        color: '#fff',
        backgroundColor: '#007bff',
        textDecoration: 'none',
        borderRadius: '8px',
        transition: 'background-color 0.2s',
    },
    secondaryButton: {
        padding: '14px 32px',
        fontSize: '18px',
        fontWeight: '600',
        color: '#007bff',
        backgroundColor: 'transparent',
        textDecoration: 'none',
        borderRadius: '8px',
        border: '2px solid #007bff',
        transition: 'background-color 0.2s',
    },
    container: {
        maxWidth: '1200px',
        margin: '40px auto',
        padding: '0 20px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
    },
};
