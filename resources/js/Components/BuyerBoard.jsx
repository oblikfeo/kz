import { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function BuyerBoard({ orders }) {
    const [showForm, setShowForm] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        subject: '',
        description: '',
        deadline: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/orders', {
            onSuccess: () => {
                setShowForm(false);
                setData({
                    title: '',
                    subject: '',
                    description: '',
                    deadline: '',
                });
            },
        });
    };

    return (
        <>
            <div style={styles.card}>
                <div style={styles.cardHeader}>
                    <h2 style={styles.cardTitle}>Создать заказ</h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        style={styles.createButton}
                    >
                        {showForm ? 'Отмена' : '+ Создать заказ'}
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={submit} style={styles.form}>
                        <div style={styles.field}>
                            <label style={styles.label}>Название услуги *</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                style={styles.input}
                                placeholder="Например: Решить задачи по математике"
                                required
                            />
                            {errors.title && (
                                <div style={styles.error}>{errors.title}</div>
                            )}
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>Предмет *</label>
                            <input
                                type="text"
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                style={styles.input}
                                placeholder="Например: Математика"
                                required
                            />
                            {errors.subject && (
                                <div style={styles.error}>{errors.subject}</div>
                            )}
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>Описание *</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                style={styles.textarea}
                                placeholder="Подробно опишите, что нужно сделать..."
                                rows="4"
                                required
                            />
                            {errors.description && (
                                <div style={styles.error}>{errors.description}</div>
                            )}
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>Срок выполнения *</label>
                            <input
                                type="date"
                                value={data.deadline}
                                onChange={(e) => setData('deadline', e.target.value)}
                                style={styles.input}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                            {errors.deadline && (
                                <div style={styles.error}>{errors.deadline}</div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            style={styles.submitButton}
                        >
                            {processing ? 'Создание...' : 'Создать заказ'}
                        </button>
                    </form>
                )}
            </div>

            <div style={styles.card}>
                <div style={styles.cardHeader}>
                    <h2 style={styles.cardTitle}>Доступные заказы</h2>
                    <Link href="/dashboard" style={styles.myOrdersLink}>
                        Мои заказы →
                    </Link>
                </div>

                {orders.length === 0 ? (
                    <div style={styles.emptyState}>
                        <p>Нет доступных заказов</p>
                        <p style={styles.emptyHint}>Создайте первый заказ, нажав кнопку выше</p>
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
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
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
    createButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    myOrdersLink: {
        color: '#007bff',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: '500',
    },
    form: {
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
    },
    field: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxSizing: 'border-box',
    },
    textarea: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
        resize: 'vertical',
    },
    error: {
        marginTop: '5px',
        fontSize: '14px',
        color: '#dc3545',
    },
    submitButton: {
        padding: '12px 24px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
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
        padding: '10px',
        backgroundColor: '#e7f3ff',
        borderRadius: '6px',
        fontSize: '14px',
        color: '#0066cc',
    },
};

