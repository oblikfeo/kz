import { Head, Link } from '@inertiajs/react';
import Layout from '../Components/Layout';

export default function Dashboard({ auth, orders = [] }) {
    const isBuyer = auth.user.role === 'buyer';
    const isSeller = auth.user.role === 'seller';

    return (
        <>
            <Head title="Личный кабинет" />
            <Layout auth={auth}>
                <div style={styles.container}>
                    <div style={styles.welcomeCard}>
                        <h1 style={styles.welcomeTitle}>
                            Личный кабинет
                        </h1>
                        <p style={styles.welcomeText}>
                            {isBuyer 
                                ? 'Ваши созданные заказы' 
                                : 'Ваши принятые заказы'}
                        </p>
                    </div>

                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <h2 style={styles.cardTitle}>
                                {isBuyer ? 'Мои заказы' : 'Принятые заказы'}
                            </h2>
                            <Link href="/" style={styles.backLink}>
                                ← Назад на главную
                            </Link>
                        </div>

                        {orders.length === 0 ? (
                            <div style={styles.emptyState}>
                                <p>
                                    {isBuyer 
                                        ? 'У вас пока нет созданных заказов' 
                                        : 'У вас пока нет принятых заказов'}
                                </p>
                                <p style={styles.emptyHint}>
                                    {isBuyer 
                                        ? 'Создайте заказ на главной странице' 
                                        : 'Принимайте заказы на главной странице'}
                                </p>
                            </div>
                        ) : (
                            <div style={styles.ordersList}>
                                {orders.map((order) => (
                                    <div key={order.id} style={styles.orderCard}>
                                        <div style={styles.orderHeader}>
                                            <h3 style={styles.orderTitle}>{order.title}</h3>
                                            <span style={{
                                                ...styles.statusBadge,
                                                ...(order.status === 'accepted' ? styles.statusAccepted : {}),
                                            }}>
                                                {order.status === 'pending' ? 'Ожидает' : 
                                                 order.status === 'accepted' ? 'Принят' : 'Выполнен'}
                                            </span>
                                        </div>
                                        <div style={styles.orderInfo}>
                                            <span style={styles.orderSubject}>📚 {order.subject}</span>
                                            <span style={styles.orderDeadline}>
                                                📅 {new Date(order.deadline).toLocaleDateString('ru-RU')}
                                            </span>
                                        </div>
                                        <p style={styles.orderDescription}>{order.description}</p>
                                        {isBuyer && order.seller && (
                                            <div style={styles.sellerInfo}>
                                                <span>Исполнитель: {order.seller.name}</span>
                                            </div>
                                        )}
                                        {isSeller && order.buyer && (
                                            <div style={styles.buyerInfo}>
                                                <span>Заказчик: {order.buyer.name}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={styles.infoCard}>
                        <h3 style={styles.infoTitle}>Информация об аккаунте</h3>
                        <div style={styles.infoGrid}>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Роль:</span>
                                <span style={styles.infoValue}>
                                    {isBuyer ? '🛒 Покупатель' : '🏪 Продавец'}
                                </span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Имя:</span>
                                <span style={styles.infoValue}>{auth.user.name}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Email:</span>
                                <span style={styles.infoValue}>{auth.user.email}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Дата регистрации:</span>
                                <span style={styles.infoValue}>
                                    {new Date(auth.user.created_at).toLocaleDateString('ru-RU')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '40px auto',
        padding: '0 20px',
    },
    welcomeCard: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '40px',
        marginBottom: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
    },
    welcomeTitle: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#333',
        margin: '0 0 10px 0',
    },
    welcomeText: {
        fontSize: '18px',
        color: '#666',
        margin: 0,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '30px',
        marginBottom: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    cardTitle: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#333',
        margin: 0,
    },
    backLink: {
        color: '#007bff',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: '500',
    },
    emptyState: {
        textAlign: 'center',
        padding: '40px',
        color: '#666',
    },
    emptyHint: {
        fontSize: '14px',
        color: '#999',
        marginTop: '10px',
    },
    ordersList: {
        display: 'grid',
        gap: '15px',
    },
    orderCard: {
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
    },
    orderHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    orderTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#333',
        margin: 0,
    },
    statusBadge: {
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
        backgroundColor: '#ffc107',
        color: '#333',
    },
    statusAccepted: {
        backgroundColor: '#28a745',
        color: '#fff',
    },
    orderInfo: {
        display: 'flex',
        gap: '20px',
        marginBottom: '10px',
        fontSize: '14px',
        color: '#666',
    },
    orderSubject: {
        fontWeight: '500',
    },
    orderDeadline: {
        fontWeight: '500',
    },
    orderDescription: {
        color: '#555',
        lineHeight: '1.6',
        margin: '10px 0',
    },
    sellerInfo: {
        marginTop: '10px',
        padding: '10px',
        backgroundColor: '#e7f3ff',
        borderRadius: '6px',
        fontSize: '14px',
        color: '#0066cc',
    },
    buyerInfo: {
        marginTop: '10px',
        padding: '10px',
        backgroundColor: '#fff3cd',
        borderRadius: '6px',
        fontSize: '14px',
        color: '#856404',
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '30px',
        marginTop: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    infoTitle: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#333',
        margin: '0 0 20px 0',
    },
    infoGrid: {
        display: 'grid',
        gap: '15px',
    },
    infoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
    },
    infoLabel: {
        fontSize: '16px',
        fontWeight: '500',
        color: '#666',
    },
    infoValue: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
    },
};
