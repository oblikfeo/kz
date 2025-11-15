import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        router.post('/auth/login', formData, {
            onSuccess: () => {
                router.visit('/dashboard');
            },
            onError: (errors) => {
                setErrors(errors);
                setLoading(false);
            },
            onFinish: () => {
                setLoading(false);
            },
        });
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.field}>
                    <label style={styles.label}>Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={styles.input}
                        required
                    />
                    {errors.email && <span style={styles.error}>{errors.email}</span>}
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Пароль</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        style={styles.input}
                        required
                    />
                    {errors.password && <span style={styles.error}>{errors.password}</span>}
                </div>

                <div style={styles.field}>
                    <label style={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={formData.remember}
                            onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                            style={styles.checkbox}
                        />
                        Запомнить меня
                    </label>
                </div>

                {errors.message && <div style={styles.errorMessage}>{errors.message}</div>}

                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? 'Вход...' : 'Войти'}
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
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
    },
    checkbox: {
        width: '16px',
        height: '16px',
    },
    button: {
        padding: '12px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: '12px',
    },
    errorMessage: {
        color: 'red',
        fontSize: '14px',
        padding: '10px',
        backgroundColor: '#ffe6e6',
        borderRadius: '4px',
    },
};

