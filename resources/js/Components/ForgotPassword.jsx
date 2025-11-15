import { useState } from 'react';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        // TODO: Реализовать восстановление пароля
        setTimeout(() => {
            setMessage('Функция восстановления пароля будет реализована позже');
            setLoading(false);
        }, 1000);
    };

    return (
        <div style={styles.container}>
            <p style={styles.description}>
                Введите ваш email для восстановления пароля
            </p>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.field}>
                    <label style={styles.label}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>

                {message && (
                    <div style={styles.message}>
                        {message}
                    </div>
                )}

                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? 'Отправка...' : 'Отправить'}
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        textAlign: 'center',
    },
    description: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '20px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    },
    label: {
        fontSize: '14px',
        fontWeight: '500',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '4px',
    },
    button: {
        padding: '12px',
        fontSize: '16px',
        backgroundColor: '#ffc107',
        color: 'black',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    message: {
        fontSize: '14px',
        padding: '10px',
        backgroundColor: '#fff3cd',
        borderRadius: '4px',
        color: '#856404',
    },
};

