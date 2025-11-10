import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import Layout from '../../Components/Layout';

export default function ForgotPassword({ auth, status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <Layout auth={auth}>
            <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Восстановление пароля</h2>

                {status && (
                    <div style={styles.status}>{status}</div>
                )}

                <div style={styles.text}>
                    Забыли пароль? Введите ваш email адрес и мы отправим вам ссылку для восстановления пароля.
                </div>

                <form onSubmit={submit} style={styles.form}>
                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            style={styles.input}
                            autoFocus
                        />
                        {errors.email && (
                            <div style={styles.error}>{errors.email}</div>
                        )}
                    </div>

                    <div style={styles.actions}>
                        <button
                            type="submit"
                            disabled={processing}
                            style={styles.button}
                        >
                            {processing ? 'Отправка...' : 'Отправить ссылку'}
                        </button>
                    </div>
                </form>

                <div style={styles.links}>
                    <Link href="/login" style={styles.link}>
                        Вернуться к входу
                    </Link>
                </div>
            </div>
            </div>
        </Layout>
    );
}

const styles = {
    container: {
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        margin: '0 0 30px 0',
        fontSize: '28px',
        fontWeight: '600',
        textAlign: 'center',
        color: '#333',
    },
    text: {
        marginBottom: '20px',
        fontSize: '14px',
        color: '#666',
        lineHeight: '1.5',
    },
    status: {
        padding: '12px',
        marginBottom: '20px',
        backgroundColor: '#d4edda',
        color: '#155724',
        borderRadius: '4px',
        fontSize: '14px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
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
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    error: {
        marginTop: '5px',
        fontSize: '14px',
        color: '#dc3545',
    },
    actions: {
        marginTop: '10px',
    },
    button: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        fontWeight: '600',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    links: {
        marginTop: '20px',
        textAlign: 'center',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
        fontSize: '14px',
    },
};


