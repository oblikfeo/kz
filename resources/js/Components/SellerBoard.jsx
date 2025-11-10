import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function SellerBoard({ orders }) {
    const acceptOrder = (orderId) => {
        router.post(`/orders/${orderId}/accept`, {}, {
            preserveScroll: true,
        });
    };

    return (
        <div style={styles.card}>
            <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>Доска объявлений</h2>
                <Link href="/dashboard" style={styles.myOrdersButton}>
                    Мои принятые заказы →
                </Link>
            </div>

            {orders.length === 0 ? (
                <div style={styles.emptyState}>
                    <p>Нет доступных заказов</p>
                    <p style={styles.emptyHint}>Новые заказы появятся здесь</p>
                </div>
            ) : (
                <div style={styles.ordersList}>
                    {orders.map((order) => (
                        <div key={order.id} style={styles.orderCard}>
                            <div style={styles.orderHeader}>
                                <h3 style={styles.orderTitle}>{order.title}</h3>
                                <span style={styles.statusBadge}>Ожидает</span>
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
                            <button
                                onClick={() => acceptOrder(order.id)}
                                style={styles.acceptButton}
                            >
                                Принять заказ
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
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
    myOrdersButton: {
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
    buyerInfo: {
        marginTop: '10px',
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#fff3cd',
        borderRadius: '6px',
        fontSize: '14px',
        color: '#856404',
    },
    acceptButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
};

