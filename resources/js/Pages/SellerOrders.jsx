import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout';

export default function SellerOrders({ auth, orders }) {
    return (
        <>
            <Head title="Мои принятые заказы" />
            <Layout auth={auth}>
                <div style={styles.container}>
                    <div style={styles.header}>
                        <h1 style={styles.title}>Мои принятые заказы</h1>
                        <a href="/dashboard" style={styles.backLink}>
                            ← Назад к доске объявлений
                        </a>
                    </div>

                    {orders.length === 0 ? (
                        <div style={styles.emptyState}>
                            <p>У вас пока нет принятых заказов</p>
                            <p style={styles.emptyHint}>
                                Принимайте заказы на <a href="/dashboard" style={styles.link}>доске объявлений</a>
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
                                            {order.status === 'accepted' ? 'В работе' : 'Выполнен'}
                                        </span>
                                    </div>
                                    <div style={styles.orderInfo}>
                                        <span style={styles.orderSubject}>📚 {order.subject}</span>
                                        <span style={styles.orderDeadline}>
                                            📅 {new Date(order.deadline).toLocaleDateString('ru-RU')}
                                        </span>
                                    </div>
                                    <p style={styles.orderDescription}>{order.description}</p>
                                    <div style={styles.buyerInfo}>
                                        <span>Заказчик: {order.buyer?.name || 'Неизвестно'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
    },
    title: {
        fontSize: '32px',
        fontWeight: '700',
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
        padding: '60px 20px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        color: '#666',
    },
    emptyHint: {
        fontSize: '14px',
        color: '#999',
        marginTop: '10px',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
    },
    ordersList: {
        display: 'grid',
        gap: '20px',
    },
    orderCard: {
        padding: '25px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0',
    },
    orderHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
    },
    orderTitle: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#333',
        margin: 0,
    },
    statusBadge: {
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: '600',
        backgroundColor: '#28a745',
        color: '#fff',
    },
    statusAccepted: {
        backgroundColor: '#007bff',
    },
    orderInfo: {
        display: 'flex',
        gap: '25px',
        marginBottom: '15px',
        fontSize: '15px',
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
        margin: '15px 0',
        fontSize: '15px',
    },
    buyerInfo: {
        marginTop: '15px',
        padding: '12px',
        backgroundColor: '#e7f3ff',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#0066cc',
        fontWeight: '500',
    },
};

