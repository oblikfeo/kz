import { useForm } from '@inertiajs/react';
import Layout from '../../Components/Layout';

export default function ResetPassword({ auth, token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/reset-password');
    };

    return (
        <Layout auth={auth}>
            <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Сброс пароля</h2>

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

                    <div style={styles.field}>
                        <label style={styles.label}>Новый пароль</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            style={styles.input}
                        />
                        {errors.password && (
                            <div style={styles.error}>{errors.password}</div>
                        )}
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Подтверждение пароля</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            style={styles.input}
                        />
                        {errors.password_confirmation && (
                            <div style={styles.error}>{errors.password_confirmation}</div>
                        )}
                    </div>

                    <div style={styles.actions}>
                        <button
                            type="submit"
                            disabled={processing}
                            style={styles.button}
                        >
                            {processing ? 'Сброс...' : 'Сбросить пароль'}
                        </button>
                    </div>
                </form>
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
};


